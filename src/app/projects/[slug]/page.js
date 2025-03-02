// app/projects/[slug]/page.js
import { createBucketClient } from "@cosmicjs/sdk";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Title from "@/components/ui/title";
import TeamTwo from "@/components/section/team/teamTwo";
import Feedback from "@/components/section/feedback";
import ProjectGallerySlider from "./ProjectGallerySlider";
import RelatedProjects from "./RelatedProjects";

const cosmic = createBucketClient({
  bucketSlug: "usance-production",
  readKey: "I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2",
});

export async function generateStaticParams() {
  const response = await cosmic.objects
    .find({
      type: "projects",
    })
    .props("slug")
    .depth(1);

  return response.objects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectData(slug) {
  const project = await cosmic.objects
    .findOne({
      type: "projects",
      slug: slug,
    })
    .props("slug,title,metadata")
    .depth(1);

  // Get reference projects if they exist
  let referenceProjects = [];
  if (project.object.metadata.reference_projects?.length > 0) {
    const referenceProjectSlugs =
      project.object.metadata.reference_projects.map((ref) => ref.slug);

    const referencesResponse = await cosmic.objects
      .find({
        type: "projects",
        slug: { $in: referenceProjectSlugs },
      })
      .props("slug,title,metadata")
      .depth(1);

    referenceProjects = referencesResponse.objects;
  }

  return {
    project: project.object,
    referenceProjects,
  };
}

export default async function ProjectSinglePage({ params }) {
  const { project, referenceProjects } = await getProjectData(params.slug);

  if (!project) {
    return <div className="text-center py-10">Project not found</div>;
  }

  return (
    <section className="blog-single">
      <div>
        {project.metadata.project_images?.length > 0 && (
          <ProjectGallerySlider images={project.metadata.project_images} />
        )}

        <div
          style={{ zIndex: "1000000" }}
          className="container 2sm:mt-[156px] sm:mt-30 mt-20"
        >
          <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
            <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
              <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
                {project.title}
              </h1>
              <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
              <div
                className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px] project-description"
                dangerouslySetInnerHTML={{
                  __html: project.metadata.description,
                }}
              />
            </div>

            <div style={{background: "#2a2b2d"}} className="py-15 sm:px-[38px] px-5 lg:-mt-[410px]">
              <Title
                title_text={
                  project.metadata.category?.value || "Project Details"
                }
                className={"text-secondary-foreground mb-0"}
              />
              <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-3 lg:gap-x-0 gap-y-[20px]">
                <li>
                  <strong className="text-secondary-foreground block text-2xl mb-1.5">
                    Opdracht:
                  </strong>
                  <span className="text-secondary-foreground block">
                    {project.metadata.opdracht}
                  </span>
                </li>
                <li>
                  <strong className="text-secondary-foreground block text-2xl mb-1.5">
                    Locatie:
                  </strong>
                  <span className="text-secondary-foreground block">
                    {project.metadata.region?.value}
                  </span>
                </li>
                <li>
                  <strong className="text-secondary-foreground block text-2xl mb-1.5">
                    Project jaar:
                  </strong>
                  <span className="text-secondary-foreground block">
                    {project.metadata.uitvoering}
                  </span>
                </li>
                <li>
                  <strong className="text-secondary-foreground block text-2xl mb-1.5">
                    Project type:
                  </strong>
                  <span className="text-secondary-foreground block">
                    {project.metadata.type_locatie}
                  </span>
                </li>
                {project.metadata.collaborations && (
                  <li>
                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                      Samenwerking met:
                    </strong>
                    <span className="text-secondary-foreground block">
                      {project.metadata.collaborations.split(',').map((collaboration, index) => {
                        const parts = collaboration.trim().split(' - ');
                        if (parts.length !== 2) return collaboration.trim();
                        
                        const [name, url] = parts;
                        return (
                          <span key={index}>
                            {index > 0 && ', '}
                            <a 
                              href={url.trim()} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="underline hover:text-primary"
                            >
                              {name.trim()}
                            </a>
                          </span>
                        );
                      })}
                    </span>
                  </li>
                )}
              </ul>
              <ButtonOutline
                className={
                  "text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary"
                }
              >
                Neem contact op
              </ButtonOutline>
            </div>
          </div>
        </div>

        {/* Reference Projects Section */}
        {referenceProjects.length > 0 && (
          <div className="container mt-32">
            <Title
              title_text="Andere projecten"
              className="text-primary-foreground mb-16"
            />
            <RelatedProjects projects={referenceProjects} />
          </div>
        )}

        {/* Related Projects Section */}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <TeamTwo /> */}
      {/* <Feedback /> */}
    </section>
  );
}
