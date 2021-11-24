import React from "react";
import SEO from "components/seo";
import Banner from "../sections/banner";
import KeyFeature from "../sections/key-feature";
import ServiceSection from "../sections/service-section";
import Feature from "../sections/feature";
import CoreFeature from "../sections/core-feature";
import WorkFlow from "../sections/workflow";
import Package from "../sections/package";
import TeamSection from "../sections/team-section";
import TestimonialCard from "../sections/testimonial";

export default function HomePage() {
  return (
    <>
      <Banner />
      <TestimonialCard />
      <CoreFeature />
      <ServiceSection />
      <WorkFlow />
      <KeyFeature />
    </>
  );
}
