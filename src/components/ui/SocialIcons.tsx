import { SocialPlatform } from "@/types/social";
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const socialIcons = {
    FACEBOOK: FaFacebook,
    INSTAGRAM: FaInstagram,
    TWITTER: FaTwitter,
    TIKTOK: FaTiktok,
    YOUTUBE: FaYoutube,
    LINKEDIN: FaLinkedin,
};

interface SocialIconProps {
    platform: SocialPlatform;
    className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, className }) => {
    const Icon = socialIcons[platform] || FaGlobe;
    return <Icon className={className} />;
};

export default SocialIcon;
