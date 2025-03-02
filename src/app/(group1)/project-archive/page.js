"use client";
import { useEffect, useState } from "react";
import ProjectCardOne from "@/components/ui/cards/projectCardOne";
import SectionTitle from "@/components/ui/sectionTitle";
import { createBucketClient } from "@cosmicjs/sdk";
import {
  cardSlideAnimation,
  cardSlideAnimationDelay,
  cardSlideAnimationRight,
  cardSlideAnimationRightDelay,
} from "@/lib/utils";
import Link from "next/link";

const cosmic = createBucketClient({
  bucketSlug: "usance-production",
  readKey: "I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2",
});

const ProjectArchive = () => {
  const [projectsByCategory, setProjectsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch all projects
        const response = await cosmic.objects
          .find({
            type: "projects",
          })
          .props("slug,title,metadata")
          .depth(1);

        // Filter projects by featured_on_homepage
        const featuredProjects = response.objects.filter(
          (project) => project.metadata?.featured_on_homepage
        );

        // Group projects by category
        const groupedProjects = featuredProjects.reduce((acc, project) => {
          const category = project.metadata?.category?.value || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            id: project.slug,
            project_name: project.title,
            project_desc: project.metadata?.description || "",
            project_img: project.metadata?.project_images?.[0]?.imgix_url || "",
            project_type: project.metadata?.type_locatie || "",
            location: project.metadata?.region?.value || "",
            project_year: project.metadata?.uitvoering || "",
            link: `/projects/${project.slug}`,
          });
          return acc;
        }, {});

        // Get one project from each category
        const categoryProjects = Object.entries(groupedProjects).map(
          ([category, projects]) => ({
            category,
            project: projects[0],
          })
        );

        // Desired order of categories
        const desiredOrder = [
          "Meubelshowroom concepts & styling",
          "Retail interieurontwerp",
          "Bedrijven interieurontwerp",
          "Particulieren interieurontwerp",
          "Woninginterieur renovatie",
          "bouwbegeleiding",
        ];

        // Sort projects by desired order
        categoryProjects.sort(
          (a, b) =>
            desiredOrder.indexOf(a.category) - desiredOrder.indexOf(b.category)
        );

        setProjectsByCategory(categoryProjects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading projects...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <section id="projects" className="relative w-full">
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Portfolio"}
          sectionTitle={"Omdat wij u en ons vak verstaan"}
          sectionDesc={"Laat je inspireren en informeren door onderstaande diensten die wij bieden en de projecten die wij reeds uit hebben mogen voeren."}
        />
      </div>

      <div className="lg:pt-30 2sm:pt-20 pt-14">
        <div className="space-y-24 lg:space-y-32">
          {projectsByCategory.map(({ category, project }, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="relative lg:h-[600px] mb-16 lg:mb-0"
              >
                <ProjectCardOne
                  project_desc={project.project_desc}
                  project_img={project.project_img}
                  project_type={project.project_type}
                  location={project.location}
                  project_year={project.project_year}
                  link={project.link}
                  project_name={project.project_name}
                  category={category}
                  order={isEven ? "lg:order-1 order-0" : ""}
                  position={
                    isEven
                      ? "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                      : "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
                  }
                  imageVariants={
                    isEven ? cardSlideAnimationRight() : cardSlideAnimation()
                  }
                  cardVariants={
                    isEven
                      ? cardSlideAnimationRightDelay()
                      : cardSlideAnimationDelay()
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;
