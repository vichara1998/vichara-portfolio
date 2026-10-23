import { DiJava, DiCss3 } from "react-icons/di";
import {
  SiJavascript, SiPhp, SiHtml5, SiMysql, SiSqlite,
  SiAndroidstudio, SiSpringboot, SiReact, SiExpress, SiGit,
} from "react-icons/si";
import { Blocks, Network, Smartphone, Database, Cpu, Lightbulb, Code2 } from "lucide-react";

const TECHNOLOGIES = {
  Java: [{ Icon: DiJava, color: "#f89820" }],
  JavaScript: [{ Icon: SiJavascript, color: "#f7df1e" }],
  PHP: [{ Icon: SiPhp, color: "#b6b9e3" }],
  "HTML & CSS": [{ Icon: SiHtml5, color: "#ff784f" }, { Icon: DiCss3, color: "#64b5f6" }],
  SQL: [{ Icon: Database, color: "#67d8dc" }],
  "Android Studio": [{ Icon: SiAndroidstudio, color: "#3ddc84" }],
  "Spring Boot": [{ Icon: SiSpringboot, color: "#86c957" }],
  React: [{ Icon: SiReact, color: "#61dafb" }],
  "Express.js": [{ Icon: SiExpress, color: "#e8f8f7" }],
  Git: [{ Icon: SiGit, color: "#ff795e" }],
  "MySQL / SQLite": [{ Icon: SiMysql, color: "#61b5df" }, { Icon: SiSqlite, color: "#8bd8ee" }],
};

const CONCEPTS = {
  "OOP Principles": Blocks,
  "RESTful APIs": Network,
  "Android Dev": Smartphone,
  "Database Design": Database,
  "IoT Systems": Cpu,
  "Problem Solving": Lightbulb,
};

export default function SkillIcon({ name }) {
  const logos = TECHNOLOGIES[name];
  const ConceptIcon = CONCEPTS[name] || Code2;
  return (
    <span className={`skill-icon${logos ? " skill-icon-brand" : ""}`} aria-hidden="true">
      {logos ? logos.map(({ Icon, color }, index) => (
        <Icon key={index} size={logos.length > 1 ? 16 : 23} style={{ color }} />
      )) : <ConceptIcon size={21} strokeWidth={1.7} />}
    </span>
  );
}
