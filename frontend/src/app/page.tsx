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

  return (
    <main>
      <HeroSection data={blocks[0]} />
      <FeaturesSection data={blocks[1]} />
    </main>
  );
}
