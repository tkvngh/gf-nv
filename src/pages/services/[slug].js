// pages/services/[slug].js
import { fetchService, fetchServices } from "@/utils/api";

export default function Service({ service }) {
  if (!service) return <div>Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      {service.content.map((item, index) => (
        item.children.map((child, i) => (
          <p key={`${index}-${i}`}>{child.text}</p>
        ))
      ))}
    </div>
  );
}

// Fetch all the services to generate paths
export async function getStaticPaths() {
  const services = await fetchServices();

  const paths = services.map(service => ({
    params: {
      slug: service.slug, // use the slug field here to create paths
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

// Fetch a single service based on ID
export async function getStaticProps({ params }) {
  const service = await fetchService(params.slug);

  return {
    props: {
      service,
    },
    revalidate: 60,
  };
}
