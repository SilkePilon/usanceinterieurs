// app/projects/[slug]/RelatedProjects.js
import Image from "next/image";
import Link from "next/link";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const RelatedProjects = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link
          href={`/projects/${project.slug}`}
          key={project.slug}
          className="group transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative overflow-hidden">
            <div className="relative h-[300px] w-full">
              <Image
                src={project.metadata.project_images?.[0]?.imgix_url || ""}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                placeholder="blur"
                blurDataURL={staticBluarDataUrl}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-200">
                {project.metadata.category?.value}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedProjects;
