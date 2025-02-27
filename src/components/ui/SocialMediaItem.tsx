import { socialIcons, SocialPlatform } from "@/lib/socialIcons";

interface SocialMediaProps {
    platform: SocialPlatform;
    url: string;
}

const SocialMediaItem: React.FC<SocialMediaProps> = ({ platform, url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            {socialIcons[platform]}
            <span>{platform}</span>
        </a>
    );
};

export default SocialMediaItem;
