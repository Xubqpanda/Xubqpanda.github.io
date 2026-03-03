# File Storage Integration Guide

This project now includes full-stack capabilities with integrated S3 file storage functionality.

## Overview

The file storage system uses Manus's built-in S3 storage service, which is automatically configured and requires no manual API key setup.

## Backend API

### File Upload Endpoint

Located in `server/routers.ts`, the `files` router provides two main procedures:

1. **getUploadUrl** - Generates a unique file key for upload
2. **upload** - Uploads the file data to S3 storage

### Usage Example (Backend)

```typescript
import { storagePut, storageGet } from "./server/storage";

// Upload a file
const { url, key } = await storagePut(
  "user-123/profile/avatar.jpg",
  fileBuffer,
  "image/jpeg"
);

// Get a file URL
const { url } = await storageGet("user-123/profile/avatar.jpg");
```

## Frontend Integration

### Using tRPC Mutations

```typescript
import { trpc } from "@/lib/trpc";

function FileUploadComponent() {
  const uploadMutation = trpc.files.upload.useMutation();

  const handleFileUpload = async (file: File) => {
    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const base64Content = base64Data.split(',')[1];

      // Get upload URL
      const { fileKey } = await trpc.files.getUploadUrl.mutate({
        fileName: file.name,
        contentType: file.type,
      });

      // Upload file
      const result = await uploadMutation.mutateAsync({
        fileKey,
        fileData: base64Content,
        contentType: file.type,
      });

      console.log('File uploaded:', result.url);
    };
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }}
    />
  );
}
```

## File Organization

Files are automatically organized by user ID to prevent conflicts:

```
user-{userId}/uploads/{timestamp}-{random}-{filename}
```

## Security

- All file operations require authentication (using `protectedProcedure`)
- Files are stored in a public S3 bucket, so URLs are directly accessible
- Random suffixes prevent file enumeration attacks

## Storage Limits

- Maximum file size: Determined by your Manus plan
- Supported file types: All types (images, documents, videos, etc.)

## Best Practices

1. **Store metadata in database**: Save file URLs, names, sizes, and other metadata in your database tables
2. **Use S3 for bytes only**: Never store file content in database columns
3. **Add random suffixes**: Always include random components in file keys to prevent enumeration
4. **Validate file types**: Check file types on both client and server side
5. **Handle errors**: Implement proper error handling for upload failures

## Example: Profile Picture Upload

```typescript
// Database schema (drizzle/schema.ts)
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  profilePictureUrl: text("profilePictureUrl"),
  profilePictureKey: text("profilePictureKey"),
  // ... other fields
});

// Backend procedure (server/routers.ts)
updateProfilePicture: protectedProcedure
  .input(z.object({
    fileData: z.string(),
    contentType: z.string(),
    fileName: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.user.id;
    const fileKey = `user-${userId}/profile/${Date.now()}-${input.fileName}`;
    const buffer = Buffer.from(input.fileData, 'base64');
    
    const { url } = await storagePut(fileKey, buffer, input.contentType);
    
    // Update database
    await db.update(users)
      .set({ profilePictureUrl: url, profilePictureKey: fileKey })
      .where(eq(users.id, userId));
    
    return { url };
  }),
```

## Troubleshooting

### Upload Fails

- Check that `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` are set (automatically injected by platform)
- Verify file size is within limits
- Check network connectivity

### File Not Accessible

- Ensure the returned URL is used correctly
- Check browser console for CORS errors (should not occur with Manus storage)

## Additional Resources

- See `server/storage.ts` for storage helper functions
- See `server/routers.ts` for file upload API implementation
- Refer to the main README.md for general full-stack development guidelines
