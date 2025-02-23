import { BookText, CodeSquare, HomeIcon, UserRound, Linkedin, Twitter, Rss, Instagram, Youtube, Crop, Pencil, Computer, Book, Rocket, Speech } from "lucide-react";

export const socialNetworks = [

    {
        id: 1,
        logo: <Linkedin size={30} strokeWidth={1} />,
        src: "#!",
    },
    {
        id: 2,
        logo: <Twitter size={30} strokeWidth={1} />,
        src: "#!",
    },
    {
        id: 3,
        logo: <Instagram size={30} strokeWidth={1} />,
        src: "#!",
    },
];


export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
        link: "/",
    },
    {
        id: 2,
        title: "User",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
        link: "/about",
    },
    {
        id: 3,
        title: "Book",
        icon: <BookText size={25} color="#fff" strokeWidth={1} />,
        link: "/services",
    },
    {
        id: 4,
        title: "Target",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
        link: "/portfolio",
    },
    {
        id: 5,
        title: "Home",
        icon: <Speech size={25} color="#fff" strokeWidth={1} />,
        link: "/testimonials",
    },
];

export const dataAboutPage = [
    {
        id: 1,
        title: "Frontend Developer",
        subtitle: "TechSolutions",
        description: "Colabora con un equipo dinámico para desarrollar interfaces de usuario atractivas y funcionales que impulsen el éxito de nuestros clientes en el mundo digital.",
        date: "Nov 2023 ",
    },
    {
        id: 2,
        title: "Creador de Experiencias Digitales",
        subtitle: "PixelCrafters",
        description: "Trabaja en proyectos emocionantes que desafían los límites de la creatividad y la tecnología. Únete a nosotros mientras creamos experiencias digitales cautivadoras que inspiran y cautivan a nuestros usuarios.",
        date: "May 2021",
    },
    {
        id: 3,
        title: "Especialista en Desarrollo Frontend",
        subtitle: "CodeForge Solutions",
        description: "Como desarrollador frontend, tendrás la oportunidad de colaborar en proyectos diversos y desafiantes que te permitirán expandir tus habilidades y dejar tu huella en el mundo digital.",
        date: "Ago 2019",
    },
    {
        id: 4,
        title: "Prácticas Grado",
        subtitle: "WebWizards Inc.",
        description: "Únete a nosotros mientras creamos sitios web y aplicaciones interactivas que sorprenden y deleitan a nuestros clientes. Si tienes pasión por el diseño y la programación, y disfrutas colaborar en un entorno creativo, ¡queremos conocerte!        ",
        date: "Mar 2018",
    },
]

export const dataCounter = [
    {
        id: 0,
        endCounter: 10,
        text: "Años de experiencia",
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 1,
        endCounter: 80,
        text: "Clientes satisfechos",
        lineRight: true,
        lineRightMobile: false,
    },
    {
        id: 2,
        endCounter: 220,
        text: "Proyectos finalizados",
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 3,
        endCounter: 30,
        text: "Premios ganadores",
        lineRight: false,
        lineRightMobile: false,
    },
];



export const dataTrickets = [
    {
        id: 1,
        name: "cristian",
        imgURl: "/tricket-1.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    },
    {
        id: 2,
        name: "cristian",
        imgURl: "/tricket-2.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    },
    {
        id: 3,
        name: "cristian",
        imgURl: "/tricket-3.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    },
    {
        id: 4,
        name: "cristian",
        imgURl: "/tricket-4.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    }


]

export const highScore = [
    {
        id: 1,
        name: "cristian",
        imgURl: "/tricket-1.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    },
    {
        id: 2,
        name: "cristian",
        imgURl: "/tricket-2.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    },
    {
        id: 3,
        name: "cristian",
        imgURl: "/tricket-3.jpg",
        likes: 2,
        share: 2,
        skills: ["U", "Steet"],
    }


]

export const howToWin = [
    {
        imagen: "/trick-est.webp",
        titulo: "patina",
        caption: "¡Prepárate para deslizarte y dominar las calles! Encuentra las mejores líneas, realiza trucos asombrosos y siente la libertad sobre tu tabla."
    },
    {
        imagen: "/graba.png",
        titulo: "graba",
        caption: "Captura tus mejores momentos sobre la tabla y comparte tu estilo único con el mundo. ¡Graba tus trucos más locos y muestra tu pasión por el skateboarding!"
    },
    {
        imagen: "/postea.png",
        titulo: "postea",
        caption: "Haz que tus amigos se sientan parte de la acción compartiendo tus sesiones de skate más épicas en línea. ¡Postea tus clips y fotos para inspirar a otros skaters y fortalecer la comunidad!"
    }
]
