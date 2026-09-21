(() => {
    const storageKey = 'newsight-language';
    const originals = new WeakMap();

    // Editorial translations owned by NewSight — no third-party translation service is used.
    const fr = {
        'Home': 'Accueil', 'About Us': 'À propos', 'Services': 'Services', 'Work & Impact': 'Réalisations et impact', 'Alumni & Clients': 'Alumni et clients', 'Get Started': 'Commencer', 'Consultation & Enrollment': 'Consultation et inscription', 'Bootcamps': 'Bootcamps', 'HIRING': 'RECRUTEMENT', 'Explore': 'Explorer', 'Bootcamp Tracks': 'Parcours de bootcamp', 'Apply for Enrollment': 'Postuler', 'Next cohort: October 15': 'Prochaine cohorte : 15 octobre', '25 seats per track': '25 places par parcours',
        'Built for progress. Designed for people.': 'Conçu pour le progrès. Pensé pour les personnes.',
        'Digital transformation, applied AI, and practical technology training for ambitious organizations and future-ready talent.': 'Transformation numérique, IA appliquée et formation technologique pratique pour des organisations ambitieuses et des talents prêts pour l’avenir.',
        'About NewSight Technologies': 'À propos de NewSight Technologies', 'Technology that makes ambitious progress': 'Une technologie qui rend le progrès ambitieux', 'possible.': 'possible.', 'We help organizations modernize how they work and help emerging talent build the skills to shape what comes next.': 'Nous aidons les organisations à moderniser leur façon de travailler et les talents émergents à acquérir les compétences qui façonneront la suite.', 'Strategy · Design · Engineering': 'Stratégie · Design · Ingénierie', 'Our Purpose': 'Notre mission', 'Practical transformation, human results.': 'Une transformation concrète, des résultats humains.', 'Clarity': 'Clarté', 'Capability': 'Capacité', 'Useful innovation': 'Innovation utile', 'Trust': 'Confiance', 'What We Do': 'Ce que nous faisons', 'One partner, two connected missions.': 'Un partenaire, deux missions liées.', 'Work with us': 'Travailler avec nous', 'Digital Transformation': 'Transformation numérique', 'Talent Hub': 'Hub de talents',
        "Let's Connect": 'Échangeons', 'Bring us the challenge.': 'Présentez-nous votre défi.', "We'll bring a way forward.": 'Nous apporterons une voie à suivre.', 'Innovation Center HQ': 'Siège du centre d’innovation', 'Email the team': 'Écrire à l’équipe', 'Phone & WhatsApp': 'Téléphone et WhatsApp', 'Enterprise Services Inquiry': 'Demande de services entreprise', 'Full Name': 'Nom complet', 'Email Address': 'Adresse e-mail', 'Phone / WhatsApp': 'Téléphone / WhatsApp', 'Company / Organization': 'Entreprise / organisation', 'Preferred Date for Meeting': 'Date souhaitée pour la réunion', 'Project / Application Scope': 'Périmètre du projet / de la candidature', 'Confirm & Book Consultation': 'Confirmer et réserver une consultation', 'Inquiry Received!': 'Demande reçue !',
        'Applications open for the next cohort': 'Candidatures ouvertes pour la prochaine cohorte', 'Build skills that create real momentum.': 'Développez des compétences qui créent un véritable élan.', 'Explore Hub Tracks': 'Explorer les parcours du Hub', 'Start an Application': 'Commencer une candidature', 'Project-based learning': 'Apprentissage par projet', 'Industry mentors': 'Mentors du secteur', 'Career support': 'Accompagnement de carrière', 'Learn. Build. Launch.': 'Apprenez. Créez. Lancez.', 'Focused tracks': 'Parcours ciblés', 'Seats per track': 'Places par parcours', 'Mentor feedback': 'Retours des mentors', 'Next cohort': 'Prochaine cohorte', 'Choose Your Track': 'Choisissez votre parcours', 'Four paths into the future of work.': 'Quatre voies vers l’avenir du travail.', 'How the Hub Works': 'Comment fonctionne le Hub', 'A structured path from practice to professional confidence.': 'Un parcours structuré, de la pratique à la confiance professionnelle.', 'Live guided sessions': 'Sessions guidées en direct', 'Portfolio-grade projects': 'Projets dignes d’un portfolio', 'Career readiness': 'Préparation à la carrière', 'What You Receive': 'Ce que vous recevez', 'Support that continues beyond the classroom.': 'Un accompagnement qui se poursuit au-delà de la salle de classe.', 'Next Step': 'Prochaine étape', 'Ready to find your place in the Hub?': 'Prêt à trouver votre place dans le Hub ?', 'Start your application': 'Commencez votre candidature',
        'Empowering Businesses & Next-Gen Tech Talent': 'Donner les moyens aux entreprises et aux talents technologiques de demain', 'Architecting Digital Transformation.': 'Concevoir la transformation numérique.', 'Nurturing Talent.': 'Faire grandir les talents.', 'Explore Enterprise Solutions': 'Explorer les solutions entreprise', 'Explore Tech Hub': 'Explorer le Hub technologique', 'Enterprise & Startup Solutions': 'Solutions pour entreprises et startups', 'End-to-End Digital Transformation Matrix': 'Matrice de transformation numérique de bout en bout', 'All Services': 'Tous les services', 'Cloud & Automation': 'Cloud et automatisation', 'AI Integration': 'Intégration de l’IA', 'Web & Mobile Products': 'Produits web et mobiles', 'Growth Strategy': 'Stratégie de croissance', 'Clear answers': 'Des réponses claires', 'Everything in one place.': 'Tout au même endroit.', 'Still have a question?': 'Vous avez encore une question ?'
    };

    const language = () => localStorage.getItem(storageKey) === 'fr' ? 'fr' : 'en';

    const render = () => {
        const selected = language();
        document.documentElement.lang = selected;
        document.querySelectorAll('[data-language-toggle]').forEach((control) => {
            control.textContent = selected === 'fr' ? 'EN' : 'FR';
            control.setAttribute('aria-label', selected === 'fr' ? 'Switch to English' : 'Passer au français');
        });
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node.parentElement.closest('script, style, [data-language-toggle]')) continue;
            if (!originals.has(node)) originals.set(node, node.nodeValue);
            const source = originals.get(node);
            const key = source.replace(/\s+/g, ' ').trim();
            if (selected !== 'fr' || !fr[key]) {
                node.nodeValue = source;
                continue;
            }
            node.nodeValue = `${source.match(/^\s*/)[0]}${fr[key]}${source.match(/\s*$/)[0]}`;
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        render();
        document.querySelectorAll('[data-language-toggle]').forEach((control) => control.addEventListener('click', () => {
            localStorage.setItem(storageKey, language() === 'fr' ? 'en' : 'fr');
            render();
        }));
    });
})();
