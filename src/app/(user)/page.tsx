// NEW
import { ProfileCard } from "@/components/web/profile/profile-card";
import { SkillCard } from "@/components/web/skill/skill-card";
import { EducationCard } from "@/components/web/education/education-card";
import { AchievementCard } from "@/components/web/achievement/achievement-card";
import { ProjectCard } from "@/components/web/project/project-card";

export default function Page(){
    return(
        <div className="space-y-8 pb-4">
            <ProfileCard />
            <SkillCard />
            <EducationCard />
            <AchievementCard />
            <ProjectCard />
        </div>
    );  
};