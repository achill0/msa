import { Component, AfterViewInit, ElementRef ,OnInit, ViewChild, HostListener} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
})
export class IndexComponent implements OnInit {
  @ViewChild('n1', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  contactForm: FormGroup;
  activeSection: string = 'hero';
@ViewChild('n1') video!: ElementRef<HTMLVideoElement>;
// home.component.ts


translations: any = {
  FR: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      contact: 'Contact'
    },

    hero: {
      description:
        'Basée au Maroc, nous sommes spécialisés dans la création de sites web et d’applications web sur mesure.',
      button: 'Contactez-nous !'
    },

    services: {
      title: 'Développement Web',
      subtitle: 'Notre agence propose les services suivants :',

      webAppsTitle: 'Applications Web',
      webAppsDesc:
        'Applications web sur mesure développées avec des frameworks modernes.',

      showcaseTitle: 'Sites Vitrine',
      showcaseDesc:
        'Sites élégants pour présenter votre marque et vos services en ligne.',

      ecommerceTitle: 'Sites E-commerce',
      ecommerceDesc:
        'Boutiques en ligne complètes avec paiements sécurisés et gestion des stocks.',

      landingTitle: 'Landing Pages',
      landingDesc:
        'Pages d’atterrissage à forte conversion, optimisées pour la performance et la génération de prospects.'
    },

    about: {
      title: 'À propos de nous',

      description:
        'Depuis plus de 17 ans, MS Agency met son expertise au service du développement web et de la création d’applications web sur mesure. Spécialisés dans la conception de sites vitrine, plateformes e-commerce et solutions digitales innovantes, nous accompagnons entreprises et entrepreneurs dans leur transformation numérique. Notre mission : offrir des expériences web performantes, modernes et adaptées à chaque besoin.'
    },

    contact: {
      title: 'Avez-vous un projet ?',

      description:
        'Vous souhaitez donner vie à vos idées ? Chez MS Agency, nous transformons vos concepts en réalité avec des solutions numériques sur mesure.',

      email: 'Email',
      phone: 'Phone'
    },

    footer: {
      services: 'Services',
      webDev: 'Développement Web',
      consulting: 'IT consulting',

      websiteCreation: 'Création site web',
      digitalAgency: 'Agence digitale Maroc',
      webApps: 'Développement applications web',

      rights: 'Tous droits réservés'
    }
  },

  EN: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact'
    },

    hero: {
      description:
        'Based in Morocco, we specialize in custom website and web application development.',
      button: 'Contact us!'
    },

    services: {
      title: 'Web Development',
      subtitle: 'Our agency offers the following services:',

      webAppsTitle: 'Web Applications',
      webAppsDesc:
        'Custom web applications built with modern frameworks.',

      showcaseTitle: 'Showcase Websites',
      showcaseDesc:
        'Elegant websites to showcase your brand and services online.',

      ecommerceTitle: 'E-commerce Websites',
      ecommerceDesc:
        'Complete online stores with secure payments and inventory management.',

      landingTitle: 'Landing Pages',
      landingDesc:
        'High-converting landing pages optimized for performance and lead generation.'
    },

    about: {
      title: 'About Us',

      description:
        'For more than 17 years, MS Agency has provided expertise in web development and custom web application creation. Specialized in showcase websites, e-commerce platforms, and innovative digital solutions, we support businesses and entrepreneurs in their digital transformation. Our mission: deliver modern, high-performance web experiences tailored to every need.'
    },

    contact: {
      title: 'Do you have a project?',

      description:
        'Do you want to bring your ideas to life? At MS Agency, we turn your concepts into reality with custom digital solutions.',

      email: 'Email',
      phone: 'Phone'
    },

    footer: {
      services: 'Services',
      webDev: 'Web Development',
      consulting: 'IT Consulting',

      websiteCreation: 'Website Creation',
      digitalAgency: 'Digital Agency Morocco',
      webApps: 'Web Application Development',

      rights: 'All rights reserved'
    }
  }
};

get t() {
  return this.translations[this.selectedLanguage];
}

burgerOpen = false

   images: string[] = [
    'assets/img/van.png', // van 1
    'assets/img/van3.jpeg', // van 2
    'assets/img/van4.jpeg', // van 3

  ];

  currentIndex = 0;

   menuOpen = false;
waitForElement(sectionId: string, timeout = 3000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const start = Date.now();

    const check = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        resolve(element);
      } else if (Date.now() - start > timeout) {
        resolve(null); // not found within time
      } else {
        setTimeout(check, 50); // retry every 50ms
      }
    };

    check();
  });
}
  async scrollToSection(sectionId: string, event: Event,isBurger?:any) {
     if(isBurger) {
      this.toggleMenu()
    }
    
    event.preventDefault();

const element = await this.waitForElement(sectionId, 1000);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      this.activeSection = sectionId; // ✅ updates active class
    }
   
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['hero', 'services', 'apropos', 'contact'];
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

toggleMenu() {
this.menuOpen = !this.menuOpen;
this.burgerOpen = !this.menuOpen
}

  get prevImage() {
    return this.currentIndex > 0 ? this.images[this.currentIndex - 1] : null;
  }

  get nextImage() {
    return this.currentIndex < this.images.length - 1 ? this.images[this.currentIndex + 1] : null;
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // navbar.component.ts

languageMenuOpen = false;

// Default language = English
selectedLanguage = 'EN';

toggleLanguageMenu() {
  this.languageMenuOpen = !this.languageMenuOpen;
}

selectLanguage(lang: string) {
  this.selectedLanguage = lang;
  this.languageMenuOpen = false;

  console.log('Selected language:', lang);

  // your translation logic here
}
  ngOnInit(): void {
    if(this.videoRef?.nativeElement){
  const video = this.videoRef.nativeElement; // ✅ Typé comme HTMLVideoElement

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(err => console.warn('Autoplay failed:', err));
      });
    }
}
  }
 constructor(private el: ElementRef,private fb: FormBuilder) {

  this.contactForm = this.fb.group({
      name: [''],    // default value empty string
      email: [''],   // you can add more fields later
    });
 }

  onSubmit() {
    console.log(this.contactForm.value);
  }

  ngAfterViewInit(): void {
    if (this.video) {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.play().catch(() => {});
  }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('in-view');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.1 });

    this.el.nativeElement.querySelectorAll('.card-animate')
      .forEach((el: Element) => observer.observe(el));
  }
}
