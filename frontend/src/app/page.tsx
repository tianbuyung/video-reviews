import qs from "qs";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { HeroSection } from "@/components/customs/HeroSection";
import { FeaturesSection } from "@/components/customs/FeaturesSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        },
      },
    },
  },
});

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeaturesSection key={block.id} data={block} />;
    default:
      return null;
  }
}

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    console.dir(flattenedData, { depth: null });

    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { blocks } = strapiData;
  if (!blocks) return <p>No sections found</p>;

  return <main>{blocks.map(blockRenderer)}</main>;
}
