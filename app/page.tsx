import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Timeline       from "@/components/Timeline";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import DriverExplorer from "@/components/DriverExplorer";
import GitHubStats    from "@/components/GitHubStats";
import BlogTeaser     from "@/components/BlogTeaser";
import Certifications from "@/components/Certifications";
import Contact        from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Experience />
      <GitHubStats />
      <BlogTeaser />
      <Certifications />
      <Contact />
    </>
  );
}
