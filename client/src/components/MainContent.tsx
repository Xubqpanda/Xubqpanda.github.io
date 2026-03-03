import { ExternalLink } from "lucide-react";
import { 
  personalInfo, 
  publications, 
  researchExperiences, 
  industryExperiences, 
  talks, 
  academicService, 
  awards, 
  projects, 
  technologies 
} from "@/config/siteConfig";

export default function MainContent() {
  return (
    <div className="w-full space-y-12">
      {/* About Me Section */}
      <section id="about">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          About Me
        </h2>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            {personalInfo.aboutMe.intro.split('Kahlert School of Computing at the University of Utah')[0]}
            <a
              href="https://www.cs.utah.edu/"
              target="_blank"
              rel="noopener"
              className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold underline decoration-2 underline-offset-2"
            >
              Kahlert School of Computing at the University of Utah
            </a>
            {', advised by '}
            <a
              href={personalInfo.advisors[0].url}
              target="_blank"
              rel="noopener"
              className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold underline decoration-2 underline-offset-2"
            >
              {personalInfo.advisors[0].name}
            </a>
            {' and '}
            <a
              href={personalInfo.advisors[1].url}
              target="_blank"
              rel="noopener"
              className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold underline decoration-2 underline-offset-2"
            >
              {personalInfo.advisors[1].name}
            </a>
            {'. Currently, I have been working as a Research Assistant under the supervision of '}
            <a
              href={personalInfo.advisors[2].url}
              target="_blank"
              rel="noopener"
              className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold underline decoration-2 underline-offset-2"
            >
              {personalInfo.advisors[2].name}
            </a>
            {' at UNC-Chapel Hill and '}
            <a
              href={personalInfo.advisors[3].url}
              target="_blank"
              rel="noopener"
              className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-semibold underline decoration-2 underline-offset-2"
            >
              {personalInfo.advisors[3].name}
            </a>
            {' at Shanghai Jiao Tong University.'}
          </p>

          <p>{personalInfo.aboutMe.researchFocus}</p>

          <div className="pl-6 border-l-4 border-blue-900 dark:border-blue-300 bg-blue-50 dark:bg-blue-900/20 py-4 pr-4 rounded-r-lg">
            <p className="font-bold mb-3 text-blue-900 dark:text-blue-300">Research Interests:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {personalInfo.aboutMe.researchInterests.map((interest, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{interest.title}:</span> {interest.description}
                </li>
              ))}
            </ul>
          </div>

          <p>{personalInfo.aboutMe.goal}</p>

          <p>{personalInfo.aboutMe.lookingFor}</p>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2 border-b border-gray-300 dark:border-gray-700 pb-2">
          Publications
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 italic">
          (*: equal contribution; †: corresponding author)
        </p>
        <div className="space-y-6">
          {publications.map((pub) => (
            <div key={pub.id} className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {pub.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pub.authors.split('Yibin Liu').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && <strong>Yibin Liu</strong>}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {pub.venue}, {pub.year}
              </p>

              <div className="flex flex-wrap gap-2 mt-2 items-center">
                {pub.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 text-sm text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium"
                  >
                    {link.text} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
                {'githubStars' in pub && pub.githubStars && (
                  <img
                    alt="GitHub repo stars"
                    src={pub.githubStars}
                    className="h-5"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Experiences Section */}
      <section id="research">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Research Experiences
        </h2>
        <div className="space-y-4">
          {researchExperiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {exp.titleLink ? (
                  <a href={exp.titleLink} target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors">
                    {exp.title}
                  </a>
                ) : (
                  exp.title
                )}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {exp.advisorLinks && exp.advisorLinks.length > 0 ? (
                  <>
                    Advisor: {exp.advisorLinks.map((advisor, idx) => (
                      <span key={idx}>
                        {idx > 0 && ', '}
                        <a href={advisor.url} target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-300 hover:underline">
                          {advisor.name}
                        </a>
                      </span>
                    ))}
                  </>
                ) : (
                  exp.period
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.location} • {exp.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Experiences Section */}
      <section id="industry">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Industry Experiences
        </h2>
        <div className="space-y-4">
          {industryExperiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{exp.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {exp.mentorLink ? (
                  <>
                    <a href={exp.mentorLink} target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-300 hover:underline">Mentor: {exp.period.replace('Mentor: ', '')}</a>
                  </>
                ) : (
                  exp.period
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.location} • {exp.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Talks Section */}
      <section id="talks">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Talks
        </h2>
        <div className="space-y-3">
          {talks.map((talk) => (
            <div key={talk.id} className="space-y-1">
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">{talk.title}</span>
                {talk.event && `, ${talk.event}`}
                {talk.location && `, ${talk.location}`}
                {talk.date && ` • ${talk.date}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Service Section */}
      <section id="service">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Academic Service
        </h2>
        <div className="space-y-3">
          {academicService.map((service) => (
            <div key={service.id} className="space-y-1">
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">{service.role}</span>{' '}
                {service.descriptionLink && service.linkText ? (
                  <>
                    {service.description.split(service.linkText)[0]}
                    <a href={service.descriptionLink} target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-300 hover:underline">
                      {service.linkText}
                    </a>
                    {service.description.split(service.linkText)[1]}
                  </>
                ) : (
                  service.description
                )}
                {service.githubBadge && (
                  <> <img src={service.githubBadge} alt="GitHub stars" className="inline-block ml-2" /></>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Awards
        </h2>
        <div className="space-y-4">
          {awards.map((award) => (
            <div key={award.id} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-300 min-w-[3rem]">
                  {award.year}
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {award.title}
                </span>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {project.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 text-sm text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium"
                  >
                    View Project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {'githubStars' in project && project.githubStars && (
                  <img
                    alt="GitHub repo stars"
                    src={project.githubStars}
                    className="h-5"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
          Technologies
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Languages</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {technologies.languages}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {technologies.technologies}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
