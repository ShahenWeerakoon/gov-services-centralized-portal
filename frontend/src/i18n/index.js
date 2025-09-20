import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        officeLocator: "Office Locator",
        documentChecklist: "Document Checklist",
        contact: "Contact",
        login: "Log in",
        signUp: "Sign Up",
        logout: "Log out",
      },
      // Homepage
      home: {
        heroTitle: "Welcome to TalkGov",
        heroSubtitle: "Your gateway to government services",
        searchPlaceholder: "Search for government services...",
        searchButton: "Search",
        popularServices: "Popular Services",
        popularServicesSubtitle:
          "Access the most commonly used government services",
        helpTitle: "Need Help?",
        helpSubtitle: "We're here to assist you",
        howTalkGovHelps: "How TalkGov Helps You",
        howTalkGovHelpsSubtitle:
          "Everything you need to access government services efficiently",
        chatbotTitle: "TalkGov Assistant",
        chatbotSubtitle: "Ask me anything about government services",
        chatbotPlaceholder: "Type your message...",
        chatbotSend: "Send",
        // Popular Services
        passport: "Passport Services",
        passportDesc: "Apply for new passport or renew existing one",
        nic: "National ID Card",
        nicDesc: "Get your National Identity Card",
        drivingLicense: "Driving License",
        drivingLicenseDesc: "Apply for driving license or renewal",
        birthCertificate: "Birth Certificate",
        birthCertificateDesc: "Obtain official birth certificate",
        marriageCertificate: "Marriage Certificate",
        marriageCertificateDesc: "Get marriage registration certificate",
        // Help Features
        allServices: "All services in one place",
        allServicesDesc:
          "Access every government service through a single, easy-to-use platform",
        askAssistant: "Ask the Assistant",
        askAssistantDesc:
          "Get instant answers to your questions about government services",
        getHumanHelp: "Get Human Help",
        getHumanHelpDesc:
          "Connect with a real person when you need more personalized assistance",
        checkDocuments: "Check Documents",
        checkDocumentsDesc:
          "Verify the status of your applications and documents in real-time",
      },
      // Contact Page
      contact: {
        title: "Contact TalkGov",
        subtitle:
          "Get in touch with us for support, feedback, or any questions about government services",
        getInTouch: "Get In Touch",
        getInTouchSubtitle:
          "We're here to help you with all your government service needs. Reach out to us through any of the channels below.",
        sendMessage: "Send Us a Message",
        sendMessageSubtitle:
          "Fill out the form below and we'll get back to you as soon as possible.",
        email: "Email",
        phone: "Phone",
        address: "Address",
        businessHours: "Business Hours",
        fullName: "Full Name",
        emailAddress: "Email Address",
        subject: "Subject",
        message: "Message",
        sendButton: "Send Message",
        sendingButton: "Sending Message...",
        successTitle: "Message Sent Successfully!",
        successMessage:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        subjectRequired: "Subject is required",
        messageRequired: "Message is required",
        generalError: "An error occurred. Please try again.",
      },
      // Auth Pages
      auth: {
        welcomeBack: "Welcome Back",
        signInSubtitle: "Sign in to your account",
        createAccount: "Create Account",
        joinSubtitle: "Join TalkGov today",
        username: "Username or Email",
        password: "Password",
        forgotPassword: "Forgot Password?",
        or: "or",
        signInWithGoogle: "Sign in with Google",
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUpHere: "Sign up here",
        signInHere: "Sign in here",
      },
      // Service Detail Page
      services: {
        backToServices: "Back to Services",
        processingTime: "Estimated Processing Time",
        serviceFee: "Service Fee",
        applyButton: "Apply Online",
        checklistButton: "Document Checklist",
        applicationSteps: "Application Steps",
        nextService: "Next Service",
        relatedServices: "Related Services",
        needHelp: "Need Help?",
        contactSupport: "Contact Support",
        notFound: {
          title: "Service Not Found",
          description: "The requested service could not be found.",
          backToServices: "Back to Services",
        },
        // Passport Service
        passport: {
          title: "Passport Application",
          description:
            "Apply for a new passport or renew your existing Sri Lankan passport.",
          processingTime: "5-7 working days",
          fee: "LKR 10,000",
          applyButton: "Apply Online",
          checklistButton: "Document Checklist",
          steps: {
            checkEligibility: {
              title: "Check Eligibility",
              description:
                "Verify that you meet the basic requirements for a passport application.",
              details:
                "Ensure you are a Sri Lankan citizen, have a valid reason for passport application, and meet age requirements.",
            },
            gatherDocuments: {
              title: "Gather Required Documents",
              description:
                "Collect all necessary documents for your passport application.",
              details:
                "You will need your NIC, birth certificate, previous passport (if applicable), and passport-sized photographs.",
            },
            completeForm: {
              title: "Complete Application Form",
              description: "Fill out the passport application form accurately.",
              details:
                "Complete all sections of the form, ensuring all information is correct and matches your supporting documents.",
            },
            submitPay: {
              title: "Submit and Pay",
              description:
                "Submit your application and make the required payment.",
              details:
                "Submit your completed application with all documents and pay the processing fee of LKR 10,000.",
            },
          },
        },
        // NIC Service
        nic: {
          title: "National ID Card",
          description:
            "Apply for a new National Identity Card or renew your existing one.",
          processingTime: "10-14 working days",
          fee: "LKR 500",
          applyButton: "Apply Online",
          checklistButton: "Document Checklist",
          steps: {
            checkEligibility: {
              title: "Check Eligibility",
              description:
                "Verify that you meet the requirements for NIC application.",
              details:
                "Ensure you are a Sri Lankan citizen and meet the minimum age requirement of 16 years.",
            },
            gatherDocuments: {
              title: "Gather Required Documents",
              description:
                "Collect all necessary documents for your NIC application.",
              details:
                "You will need your birth certificate, previous NIC (if applicable), and passport-sized photographs.",
            },
            completeForm: {
              title: "Complete Application Form",
              description: "Fill out the NIC application form accurately.",
              details:
                "Complete all sections of the form, ensuring all information is correct and matches your supporting documents.",
            },
            submitPay: {
              title: "Submit and Pay",
              description:
                "Submit your application and make the required payment.",
              details:
                "Submit your completed application with all documents and pay the processing fee of LKR 500.",
            },
          },
        },
        // Other Services
        birthCertificate: {
          title: "Birth Certificate",
        },
        marriageCertificate: {
          title: "Marriage Certificate",
        },
        policeClearance: {
          title: "Police Clearance",
        },
      },
      // About Page
      about: {
        hero: {
          title: "About TalkGov",
          subtitle:
            "Transforming government services through digital innovation and citizen-centric design",
        },
        stats: {
          users: "Active Users",
          services: "Government Services",
          support: "Support Available",
          languages: "Languages Supported",
        },
        mission: {
          title: "Our Mission",
          description:
            "We are committed to revolutionizing how citizens interact with government services by providing a seamless, accessible, and user-friendly digital platform.",
          point1: {
            title: "Digital Transformation",
            description:
              "Modernizing government services through cutting-edge technology and user-centered design principles.",
          },
          point2: {
            title: "Citizen Empowerment",
            description:
              "Empowering citizens with easy access to government services and transparent processes.",
          },
          point3: {
            title: "Inclusive Access",
            description:
              "Ensuring all citizens can access government services regardless of their technical expertise or location.",
          },
          visual: {
            title: "Building the Future",
            description:
              "Creating a more connected and efficient government ecosystem for all Sri Lankan citizens.",
          },
        },
        values: {
          title: "Our Values",
          subtitle: "The principles that guide everything we do",
          transparency: {
            title: "Transparency",
            description:
              "We believe in open, honest communication and transparent processes that build trust with our citizens.",
          },
          accessibility: {
            title: "Accessibility",
            description:
              "Making government services accessible to everyone, regardless of their abilities or circumstances.",
          },
          innovation: {
            title: "Innovation",
            description:
              "Continuously improving and innovating to provide the best possible experience for our users.",
          },
          service: {
            title: "Service Excellence",
            description:
              "Committed to delivering exceptional service quality and exceeding citizen expectations.",
          },
        },
        features: {
          title: "Platform Features",
          subtitle:
            "Powerful tools designed to simplify your government service experience",
          mobile: {
            title: "Mobile-First Design",
            description:
              "Optimized for mobile devices with responsive design that works perfectly on any screen size.",
          },
          security: {
            title: "Enterprise Security",
            description:
              "Bank-level security measures to protect your personal information and ensure data privacy.",
          },
          analytics: {
            title: "Real-Time Analytics",
            description:
              "Track your application status and get real-time updates on your government service requests.",
          },
          support: {
            title: "24/7 Support",
            description:
              "Round-the-clock customer support to help you with any questions or issues you may have.",
          },
        },
        technology: {
          title: "Technology Stack",
          subtitle:
            "Built with modern, reliable technologies for optimal performance and security",
          frontend: {
            title: "Frontend Technologies",
          },
          backend: {
            title: "Backend Technologies",
          },
          database: {
            title: "Database & Storage",
          },
        },
        cta: {
          title: "Ready to Experience the Future of Government Services?",
          description:
            "Join thousands of citizens who have already discovered the convenience of digital government services.",
          contactButton: "Contact Us",
          servicesButton: "Explore Services",
        },
      },
      // Footer
      footer: {
        description:
          "Your gateway to Sri Lankan government services. Simple, fast, and accessible.",
        quickLinks: "Quick Links",
        legal: "Legal",
        feedback: "Feedback",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        accessibility: "Accessibility",
        copyright: "© 2025 TalkGov. All rights reserved.",
      },
      // Chatbot
      chatbot: {
        title: "TalkGov Assistant",
        status: "Online",
        welcomeMessage:
          "Hello! How can I help you with government services today?",
        inputPlaceholder: "Type your message...",
        response1:
          "I can help you find information about government services. What would you like to know?",
        response2:
          "You can apply for various services like passports, NIC, and driving licenses through our platform.",
        response3:
          "Need help with document requirements? I can guide you through the process.",
        response4:
          "For more detailed assistance, you can contact our support team or visit our help center.",
      },
    },
  },
  si: {
    translation: {
      // Navigation
      nav: {
        home: "මුල් පිටුව",
        about: "අප ගැන",
        services: "සේවා",
        officeLocator: "කාර්යාල ස්ථානය",
        documentChecklist: "ලේඛන ලැයිස්තුව",
        contact: "සම්බන්ධතා",
        login: "පුරන්න",
        signUp: "ලියාපදිංචි වන්න",
        logout: "ඉවත් වන්න",
      },
      // Homepage
      home: {
        heroTitle: "TalkGov වෙත සාදරයෙන් පිළිගනිමු",
        heroSubtitle: "රජයේ සේවා වෙත ඔබේ දොරටුව",
        searchPlaceholder: "රජයේ සේවා සඳහා සොයන්න...",
        searchButton: "සොයන්න",
        popularServices: "ප්‍රසිද්ධ සේවා",
        popularServicesSubtitle:
          "වඩාත් බහුලව භාවිතා කරන රජයේ සේවා වෙත ප්‍රවේශ වන්න",
        helpTitle: "උදව් අවශ්‍යද?",
        helpSubtitle: "ඔබට උදව් කිරීමට අපි මෙහි සිටිමු",
        howTalkGovHelps: "TalkGov ඔබට කෙසේ උදව් කරයි",
        howTalkGovHelpsSubtitle:
          "රජයේ සේවා වලට කාර්යක්ෂමව ප්‍රවේශ වීමට ඔබට අවශ්‍ය සියල්ල",
        chatbotTitle: "TalkGov සහායක",
        chatbotSubtitle: "රජයේ සේවා ගැන ඕනෑම දෙයක් මගෙන් අසන්න",
        chatbotPlaceholder: "ඔබේ පණිවිඩය ටයිප් කරන්න...",
        chatbotSend: "යවන්න",
        // Popular Services
        passport: "විදේශ ගමනාන්ත පත්‍ර සේවා",
        passportDesc:
          "නව විදේශ ගමනාන්ත පත්‍රයක් අයදුම් කරන්න හෝ පවතින එක නැවත ලබා ගන්න",
        nic: "ජාතික හැඳුනුම්පත්",
        nicDesc: "ඔබේ ජාතික හැඳුනුම්පත් ලබා ගන්න",
        drivingLicense: "රියදුරු බලපත්‍රය",
        drivingLicenseDesc: "රියදුරු බලපත්‍රයක් අයදුම් කරන්න හෝ නැවත ලබා ගන්න",
        birthCertificate: "උපත සහතිකය",
        birthCertificateDesc: "නිල උපත සහතිකය ලබා ගන්න",
        marriageCertificate: "විවාහ සහතිකය",
        marriageCertificateDesc: "විවාහ ලියාපදිංචි සහතිකය ලබා ගන්න",
        // Help Features
        allServices: "සියලු සේවා එක් ස්ථානයක",
        allServicesDesc:
          "එක්, පහසු භාවිතා කළ හැකි වේදිකාවක් හරහා සෑම රජයේ සේවාවකටම ප්‍රවේශ වන්න",
        askAssistant: "සහායකයාගෙන් අසන්න",
        askAssistantDesc:
          "රජයේ සේවා ගැන ඔබේ ප්‍රශ්නවලට ක්ෂණික පිළිතුරු ලබා ගන්න",
        getHumanHelp: "මිනිස් උදව් ලබා ගන්න",
        getHumanHelpDesc:
          "වැඩි පුද්ගලික උදව් අවශ්‍ය විට සැබෑ පුද්ගලයෙකු සමඟ සම්බන්ධ වන්න",
        checkDocuments: "ලේඛන පරීක්ෂා කරන්න",
        checkDocumentsDesc:
          "ඔබේ අයදුම්පත් සහ ලේඛනවල තත්වය සැබෑ කාලයේදී සත්‍යාපනය කරන්න",
      },
      // Contact Page
      contact: {
        title: "TalkGov සම්බන්ධ වන්න",
        subtitle:
          "සහාය, ප්‍රතිචාර හෝ රජයේ සේවා ගැන ඕනෑම ප්‍රශ්නයක් සඳහා අප හා සම්බන්ධ වන්න",
        getInTouch: "සම්බන්ධ වන්න",
        getInTouchSubtitle:
          "ඔබේ සියලු රජයේ සේවා අවශ්‍යතා සඳහා ඔබට උදව් කිරීමට අපි මෙහි සිටිමු. පහත නාලිකා හරහා අප හා සම්බන්ධ වන්න.",
        sendMessage: "අපට පණිවිඩයක් යවන්න",
        sendMessageSubtitle:
          "පහත පෝරමය පුරවා අපි හැකි ඉක්මනින් ඔබට ප්‍රතිචාර දෙමු.",
        email: "විද්‍යුත් තැපෑල",
        phone: "දුරකථනය",
        address: "ලිපිනය",
        businessHours: "ව්‍යාපාරික පැය",
        fullName: "සම්පූර්ණ නම",
        emailAddress: "විද්‍යුත් තැපෑල",
        subject: "විෂය",
        message: "පණිවිඩය",
        sendButton: "පණිවිඩය යවන්න",
        sendingButton: "පණිවිඩය යවමින්...",
        successTitle: "පණිවිඩය සාර්ථකව යවන ලදී!",
        successMessage:
          "අප හා සම්බන්ධ වීමට ස්තූතියි. අපි 24 පැය තුළ ඔබට ප්‍රතිචාර දෙමු.",
        nameRequired: "නම අවශ්‍යයි",
        emailRequired: "විද්‍යුත් තැපෑල අවශ්‍යයි",
        emailInvalid: "කරුණාකර වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න",
        subjectRequired: "විෂය අවශ්‍යයි",
        messageRequired: "පණිවිඩය අවශ්‍යයි",
        generalError: "දෝෂයක් සිදුවිය. කරුණාකර නැවත උත්සාහ කරන්න.",
      },
      // Auth Pages
      auth: {
        welcomeBack: "නැවත සාදරයෙන් පිළිගනිමු",
        signInSubtitle: "ඔබේ ගිණුමට පුරන්න",
        createAccount: "ගිණුම සාදන්න",
        joinSubtitle: "අද TalkGov හි එකතු වන්න",
        username: "පරිශීලක නම හෝ විද්‍යුත් තැපෑල",
        password: "මුරපදය",
        forgotPassword: "මුරපදය අමතකද?",
        or: "හෝ",
        signInWithGoogle: "Google සමඟ පුරන්න",
        dontHaveAccount: "ගිණුමක් නැද්ද?",
        alreadyHaveAccount: "දැනටමත් ගිණුමක් තිබේද?",
        signUpHere: "මෙහි ලියාපදිංචි වන්න",
        signInHere: "මෙහි පුරන්න",
      },
      // Service Detail Page
      services: {
        backToServices: "සේවා වෙත ආපසු",
        processingTime: "ඇස්තමේන්තුගත සැකසුම් කාලය",
        serviceFee: "සේවා ගණන",
        applyButton: "අන්තර්ජාලයෙන් අයදුම් කරන්න",
        checklistButton: "ලේඛන ලැයිස්තුව",
        applicationSteps: "අයදුම් පියවර",
        nextService: "ඊළඟ සේවාව",
        relatedServices: "අදාළ සේවා",
        needHelp: "උදව් අවශ්‍යද?",
        contactSupport: "සහාය සම්බන්ධ වන්න",
        notFound: {
          title: "සේවාව හමු නොවීය",
          description: "ඉල්ලූ සේවාව හමු නොවීය.",
          backToServices: "සේවා වෙත ආපසු",
        },
        // Passport Service
        passport: {
          title: "විදේශ ගමනාන්ත පත්‍ර අයදුම්",
          description:
            "නව විදේශ ගමනාන්ත පත්‍රයක් අයදුම් කරන්න හෝ ඔබේ පවතින ශ්‍රී ලංකා විදේශ ගමනාන්ත පත්‍රය නැවත ලබා ගන්න.",
          processingTime: "5-7 වැඩ කරන දින",
          fee: "රු. 10,000",
          applyButton: "අන්තර්ජාලයෙන් අයදුම් කරන්න",
          checklistButton: "ලේඛන ලැයිස්තුව",
          steps: {
            checkEligibility: {
              title: "සුදුසුකම් පරීක්ෂා කරන්න",
              description:
                "විදේශ ගමනාන්ත පත්‍ර අයදුම් සඳහා මූලික අවශ්‍යතා සපුරා ඇති බව සත්‍යාපනය කරන්න.",
              details:
                "ඔබ ශ්‍රී ලාංකික පුරවැසියෙක් බව, විදේශ ගමනාන්ත පත්‍ර අයදුම් සඳහා වලංගු හේතුවක් ඇති බව සහ වයස් අවශ්‍යතා සපුරා ඇති බව සහතික කරන්න.",
            },
            gatherDocuments: {
              title: "අවශ්‍ය ලේඛන එකතු කරන්න",
              description:
                "ඔබේ විදේශ ගමනාන්ත පත්‍ර අයදුම් සඳහා අවශ්‍ය සියලු ලේඛන එකතු කරන්න.",
              details:
                "ඔබට ඔබේ ජාතික හැඳුනුම්පත්, උපත සහතිකය, පෙර විදේශ ගමනාන්ත පත්‍රය (ඇත්නම්) සහ විදේශ ගමනාන්ත පත්‍ර ප්‍රමාණයේ ඡායාරූප අවශ්‍ය වේ.",
            },
            completeForm: {
              title: "අයදුම් පෝරමය සම්පූර්ණ කරන්න",
              description:
                "විදේශ ගමනාන්ත පත්‍ර අයදුම් පෝරමය නිරවද්‍යව පුරවන්න.",
              details:
                "පෝරමයේ සියලු කොටස් සම්පූර්ණ කරන්න, සියලු තොරතුරු නිරවද්‍ය බව සහ ඔබේ සහාය ලේඛන සමඟ ගැලපෙන බව සහතික කරන්න.",
            },
            submitPay: {
              title: "ඉදිරිපත් කර ගෙවන්න",
              description: "ඔබේ අයදුම් ඉදිරිපත් කර අවශ්‍ය ගෙවීම කරන්න.",
              details:
                "සියලු ලේඛන සමඟ ඔබේ සම්පූර්ණ අයදුම් ඉදිරිපත් කර රු. 10,000 සැකසුම් ගණන ගෙවන්න.",
            },
          },
        },
        // NIC Service
        nic: {
          title: "ජාතික හැඳුනුම්පත්",
          description:
            "නව ජාතික හැඳුනුම්පත් අයදුම් කරන්න හෝ ඔබේ පවතින එක නැවත ලබා ගන්න.",
          processingTime: "10-14 වැඩ කරන දින",
          fee: "රු. 500",
          applyButton: "අන්තර්ජාලයෙන් අයදුම් කරන්න",
          checklistButton: "ලේඛන ලැයිස්තුව",
          steps: {
            checkEligibility: {
              title: "සුදුසුකම් පරීක්ෂා කරන්න",
              description:
                "ජාතික හැඳුනුම්පත් අයදුම් සඳහා අවශ්‍යතා සපුරා ඇති බව සත්‍යාපනය කරන්න.",
              details:
                "ඔබ ශ්‍රී ලාංකික පුරවැසියෙක් බව සහ අවම වයස් අවශ්‍යතාවය වසර 16 සපුරා ඇති බව සහතික කරන්න.",
            },
            gatherDocuments: {
              title: "අවශ්‍ය ලේඛන එකතු කරන්න",
              description:
                "ඔබේ ජාතික හැඳුනුම්පත් අයදුම් සඳහා අවශ්‍ය සියලු ලේඛන එකතු කරන්න.",
              details:
                "ඔබට ඔබේ උපත සහතිකය, පෙර ජාතික හැඳුනුම්පත් (ඇත්නම්) සහ විදේශ ගමනාන්ත පත්‍ර ප්‍රමාණයේ ඡායාරූප අවශ්‍ය වේ.",
            },
            completeForm: {
              title: "අයදුම් පෝරමය සම්පූර්ණ කරන්න",
              description: "ජාතික හැඳුනුම්පත් අයදුම් පෝරමය නිරවද්‍යව පුරවන්න.",
              details:
                "පෝරමයේ සියලු කොටස් සම්පූර්ණ කරන්න, සියලු තොරතුරු නිරවද්‍ය බව සහ ඔබේ සහාය ලේඛන සමඟ ගැලපෙන බව සහතික කරන්න.",
            },
            submitPay: {
              title: "ඉදිරිපත් කර ගෙවන්න",
              description: "ඔබේ අයදුම් ඉදිරිපත් කර අවශ්‍ය ගෙවීම කරන්න.",
              details:
                "සියලු ලේඛන සමඟ ඔබේ සම්පූර්ණ අයදුම් ඉදිරිපත් කර රු. 500 සැකසුම් ගණන ගෙවන්න.",
            },
          },
        },
        // Other Services
        birthCertificate: {
          title: "උපත සහතිකය",
        },
        marriageCertificate: {
          title: "විවාහ සහතිකය",
        },
        policeClearance: {
          title: "පොලිස් පිරිසිදුකම",
        },
      },
      // About Page
      about: {
        hero: {
          title: "TalkGov ගැන",
          subtitle:
            "ඩිජිටල් නවෝත්පාදනය හා පුරවැසි-කේන්ද්‍රීය සැලසුම් හරහා රජයේ සේවා පරිවර්තනය කිරීම",
        },
        stats: {
          users: "ක්‍රියාකාරී පරිශීලකයන්",
          services: "රජයේ සේවා",
          support: "සහාය ලබා ගත හැක",
          languages: "සහාය දක්වන භාෂා",
        },
        mission: {
          title: "අපේ මෙහෙවර",
          description:
            "රජයේ සේවා සමඟ පුරවැසියන් අන්තර්ක්‍රියා කරන ආකාරය විප්ලවීය වෙනස් කිරීමට අපි කැපවී සිටිමු, අඛණ්ඩ, ප්‍රවේශ විය හැකි සහ පරිශීලක-හිතකාමී ඩිජිටල් වේදිකාවක් සපයමින්.",
          point1: {
            title: "ඩිජිටල් පරිවර්තනය",
            description:
              "ක්‍රියාකාරී තාක්ෂණය සහ පරිශීලක-කේන්ද්‍රීය සැලසුම් මූලධර්ම හරහා රජයේ සේවා නවීකරණය කිරීම.",
          },
          point2: {
            title: "පුරවැසි බලවත්කරණය",
            description:
              "රජයේ සේවා වලට පහසු ප්‍රවේශය සහ පාරදෘෂ්‍ය ක්‍රියාවලි සමඟ පුරවැසියන් බලවත් කිරීම.",
          },
          point3: {
            title: "ඇතුළත් ප්‍රවේශය",
            description:
              "ඔවුන්ගේ තාක්ෂණික විශේෂඥතාව හෝ ස්ථානය නොසලකා සියලු පුරවැසියන්ට රජයේ සේවා වලට ප්‍රවේශ විය හැකි බව සහතික කිරීම.",
          },
          visual: {
            title: "අනාගතය ගොඩනැගීම",
            description:
              "ශ්‍රී ලාංකික සියලු පුරවැසියන් සඳහා වඩා සම්බන්ධිත සහ කාර්යක්ෂම රජයේ පරිසරයක් නිර්මාණය කිරීම.",
          },
        },
        values: {
          title: "අපේ අගයන්",
          subtitle: "අප කරන සියල්ල මඟ පෙන්වන මූලධර්ම",
          transparency: {
            title: "පාරදෘෂ්‍යතාව",
            description:
              "අපේ පුරවැසියන් සමඟ විශ්වාසය ගොඩනඟන විවෘත, සාධාරණ සන්නිවේදනය සහ පාරදෘෂ්‍ය ක්‍රියාවලි වල විශ්වාසය අපට ඇත.",
          },
          accessibility: {
            title: "ප්‍රවේශතාව",
            description:
              "ඔවුන්ගේ හැකියාවන් හෝ තත්වයන් නොසලකා සියලු දෙනාට රජයේ සේවා ප්‍රවේශ විය හැකි කිරීම.",
          },
          innovation: {
            title: "නවෝත්පාදනය",
            description:
              "අපේ පරිශීලකයන් සඳහා හැකි උපරිම අත්දැකීම සපයන අඛණ්ඩව වැඩිදියුණු කිරීම සහ නවෝත්පාදනය කිරීම.",
          },
          service: {
            title: "සේවා උත්කර්ෂතාව",
            description:
              "විශිෂ්ට සේවා ගුණත්වය ලබා දීමට සහ පුරවැසි අපේක්ෂාවන් ඉක්මවා යාමට කැපවී සිටීම.",
          },
        },
        features: {
          title: "වේදිකා විශේෂාංග",
          subtitle:
            "ඔබේ රජයේ සේවා අත්දැකීම සරල කිරීම සඳහා නිර්මාණය කරන ලද බලවත් මෙවලම්",
          mobile: {
            title: "ජංගම-ප්‍රථම සැලසුම",
            description:
              "ඕනෑම තිර ප්‍රමාණයකදී පරිපූර්ණව ක්‍රියා කරන ප්‍රතිචාරක සැලසුමක් සමඟ ජංගම උපකරණ සඳහා ප්‍රශස්ත කරන ලද.",
          },
          security: {
            title: "ව්‍යවසාය ආරක්ෂාව",
            description:
              "ඔබේ පුද්ගලික තොරතුරු ආරක්ෂා කිරීම සහ දත්ත පෞද්ගලිකත්වය සහතික කිරීම සඳහා බැංකු-ප්‍රමාණයේ ආරක්ෂක පියවර.",
          },
          analytics: {
            title: "සැබෑ-කාල විශ්ලේෂණ",
            description:
              "ඔබේ අයදුම්පත් තත්වය ට්‍රැක් කරන්න සහ ඔබේ රජයේ සේවා ඉල්ලීම් පිළිබඳ සැබෑ-කාල යාවත්කාලීන ලබා ගන්න.",
          },
          support: {
            title: "24/7 සහාය",
            description:
              "ඔබට තිබිය හැකි ඕනෑම ප්‍රශ්නයක් හෝ ගැටලුවක් සමඟ ඔබට උදව් කිරීම සඳහා දින-රාත්‍රියේ පාරිභෝගික සහාය.",
          },
        },
        technology: {
          title: "තාක්ෂණ ගොනුව",
          subtitle:
            "ප්‍රශස්ත කාර්ය සාධනය සහ ආරක්ෂාව සඳහා නවීන, විශ්වසනීය තාක්ෂණ සමඟ ගොඩනඟන ලද",
          frontend: {
            title: "පෙරටු-අන්ත තාක්ෂණ",
          },
          backend: {
            title: "පසු-අන්ත තාක්ෂණ",
          },
          database: {
            title: "දත්ත සමුදාය සහ ගබඩාව",
          },
        },
        cta: {
          title: "රජයේ සේවා වල අනාගතය අත්දැකීමට සූදානම්ද?",
          description:
            "ඩිජිටල් රජයේ සේවා වල පහසුව දැනටමත් සොයාගත් දහස් ගණනක් පුරවැසියන් සමඟ එකතු වන්න.",
          contactButton: "අප හා සම්බන්ධ වන්න",
          servicesButton: "සේවා ගවේෂණය කරන්න",
        },
      },
      // Footer
      footer: {
        description:
          "ශ්‍රී ලාංකික රජයේ සේවා වෙත ඔබේ දොරටුව. සරල, වේගවත් සහ ප්‍රවේශ විය හැකි.",
        quickLinks: "වේගවත් සබැඳි",
        legal: "නීතිමය",
        feedback: "ප්‍රතිචාර",
        privacyPolicy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
        termsOfService: "සේවා නියමයන්",
        accessibility: "ප්‍රවේශතාව",
        copyright: "© 2025 TalkGov. සියලුම අයිතිවාසිකම් ඇවිරිණි.",
      },
      // Chatbot
      chatbot: {
        title: "TalkGov සහායක",
        status: "අන්තර්ජාලයේ",
        welcomeMessage: "හෙලෝ! රජයේ සේවා ගැන අද ඔබට කෙසේ උදව් කළ හැකිද?",
        inputPlaceholder: "ඔබේ පණිවිඩය ටයිප් කරන්න...",
        response1:
          "රජයේ සේවා ගැන තොරතුරු සොයා ගැනීමට මට ඔබට උදව් කළ හැකිය. ඔබ දැන ගැනීමට කැමති කුමක්ද?",
        response2:
          "අපේ වේදිකාව හරහා විදේශ ගමනාන්ත පත්‍ර, ජාතික හැඳුනුම්පත් සහ රියදුරු බලපත්‍ර වැනි විවිධ සේවා සඳහා ඔබට අයදුම් කළ හැකිය.",
        response3:
          "ලේඛන අවශ්‍යතා සමඟ උදව් අවශ්‍යද? ක්‍රියාවලිය හරහා මට ඔබට මග පෙන්විය හැකිය.",
        response4:
          "වැඩි විස්තරාත්මක උදව් සඳහා, ඔබට අපේ සහාය කණ්ඩායම සමඟ සම්බන්ධ විය හැකිය හෝ අපේ උදව් මධ්‍යස්ථානයට පිවිසිය හැකිය.",
      },
    },
  },
  ta: {
    translation: {
      // Navigation
      nav: {
        home: "முகப்பு",
        about: "எங்களைப் பற்றி",
        services: "சேவைகள்",
        officeLocator: "அலுவலக இருப்பிடம்",
        documentChecklist: "ஆவண பட்டியல்",
        contact: "தொடர்பு",
        login: "உள்நுழைய",
        signUp: "பதிவு செய்",
        logout: "வெளியேறு",
      },
      // Homepage
      home: {
        heroTitle: "TalkGov வரவேற்கிறோம்",
        heroSubtitle: "அரசு சேவைகளுக்கு உங்கள் நுழைவாயில்",
        searchPlaceholder: "அரசு சேவைகளுக்காக தேடுங்கள்...",
        searchButton: "தேடு",
        popularServices: "பிரபலமான சேவைகள்",
        popularServicesSubtitle:
          "மிகவும் பொதுவாக பயன்படுத்தப்படும் அரசு சேவைகளுக்கு அணுகவும்",
        helpTitle: "உதவி தேவையா?",
        helpSubtitle: "உங்களுக்கு உதவ நாங்கள் இங்கே இருக்கிறோம்",
        howTalkGovHelps: "TalkGov உங்களுக்கு எவ்வாறு உதவுகிறது",
        howTalkGovHelpsSubtitle:
          "அரசு சேவைகளுக்கு திறம்பட அணுக உங்களுக்கு தேவையான அனைத்தும்",
        chatbotTitle: "TalkGov உதவியாளர்",
        chatbotSubtitle: "அரசு சேவைகள் பற்றி எதையும் என்னிடம் கேளுங்கள்",
        chatbotPlaceholder: "உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...",
        chatbotSend: "அனுப்பு",
        // Popular Services
        passport: "பாஸ்போர்ட் சேவைகள்",
        passportDesc:
          "புதிய பாஸ்போர்ட்டுக்கு விண்ணப்பிக்கவும் அல்லது இருக்கும் ஒன்றை புதுப்பிக்கவும்",
        nic: "தேசிய அடையாள அட்டை",
        nicDesc: "உங்கள் தேசிய அடையாள அட்டையை பெறவும்",
        drivingLicense: "ஓட்டுநர் உரிமம்",
        drivingLicenseDesc:
          "ஓட்டுநர் உரிமத்துக்கு விண்ணப்பிக்கவும் அல்லது புதுப்பிக்கவும்",
        birthCertificate: "பிறப்பு சான்றிதழ்",
        birthCertificateDesc: "அதிகாரப்பூர்வ பிறப்பு சான்றிதழை பெறவும்",
        marriageCertificate: "திருமண சான்றிதழ்",
        marriageCertificateDesc: "திருமண பதிவு சான்றிதழை பெறவும்",
        // Help Features
        allServices: "ஒரே இடத்தில் அனைத்து சேவைகள்",
        allServicesDesc:
          "ஒரு, எளிதாக பயன்படுத்தக்கூடிய தளத்தின் மூலம் ஒவ்வொரு அரசு சேவைக்கும் அணுகவும்",
        askAssistant: "உதவியாளரிடம் கேளுங்கள்",
        askAssistantDesc:
          "அரசு சேவைகள் பற்றிய உங்கள் கேள்விகளுக்கு உடனடி பதில்களை பெறவும்",
        getHumanHelp: "மனித உதவியை பெறவும்",
        getHumanHelpDesc:
          "மேலும் தனிப்பட்ட உதவி தேவைப்படும்போது உண்மையான நபருடன் இணைக்கவும்",
        checkDocuments: "ஆவணங்களை சரிபார்க்கவும்",
        checkDocumentsDesc:
          "உங்கள் விண்ணப்பங்கள் மற்றும் ஆவணங்களின் நிலையை நேரடியாக சரிபார்க்கவும்",
      },
      // Contact Page
      contact: {
        title: "TalkGov உடன் தொடர்பு கொள்ளுங்கள்",
        subtitle:
          "ஆதரவு, கருத்து அல்லது அரசு சேவைகள் பற்றிய எந்த கேள்விகளுக்கும் எங்களுடன் தொடர்பு கொள்ளுங்கள்",
        getInTouch: "தொடர்பு கொள்ளுங்கள்",
        getInTouchSubtitle:
          "உங்கள் அனைத்து அரசு சேவை தேவைகளுக்கும் உதவ நாங்கள் இங்கே இருக்கிறோம். கீழே உள்ள சேனல்கள் மூலம் எங்களுடன் தொடர்பு கொள்ளுங்கள்.",
        sendMessage: "எங்களுக்கு செய்தி அனுப்புங்கள்",
        sendMessageSubtitle:
          "கீழே உள்ள படிவத்தை நிரப்பி, முடிந்தவரை விரைவில் உங்களுக்கு பதிலளிப்போம்.",
        email: "மின்னஞ்சல்",
        phone: "தொலைபேசி",
        address: "முகவரி",
        businessHours: "வணிக நேரங்கள்",
        fullName: "முழு பெயர்",
        emailAddress: "மின்னஞ்சல் முகவரி",
        subject: "பொருள்",
        message: "செய்தி",
        sendButton: "செய்தி அனுப்பு",
        sendingButton: "செய்தி அனுப்புகிறது...",
        successTitle: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!",
        successMessage:
          "எங்களுடன் தொடர்பு கொண்டதற்கு நன்றி. 24 மணி நேரத்திற்குள் உங்களுக்கு பதிலளிப்போம்.",
        nameRequired: "பெயர் தேவை",
        emailRequired: "மின்னஞ்சல் தேவை",
        emailInvalid: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        subjectRequired: "பொருள் தேவை",
        messageRequired: "செய்தி தேவை",
        generalError: "பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
      },
      // Auth Pages
      auth: {
        welcomeBack: "மீண்டும் வரவேற்கிறோம்",
        signInSubtitle: "உங்கள் கணக்கில் உள்நுழையுங்கள்",
        createAccount: "கணக்கை உருவாக்குங்கள்",
        joinSubtitle: "இன்று TalkGov இல் சேரவும்",
        username: "பயனர் பெயர் அல்லது மின்னஞ்சல்",
        password: "கடவுச்சொல்",
        forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
        or: "அல்லது",
        signInWithGoogle: "Google உடன் உள்நுழையுங்கள்",
        dontHaveAccount: "கணக்கு இல்லையா?",
        alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
        signUpHere: "இங்கே பதிவு செய்யுங்கள்",
        signInHere: "இங்கே உள்நுழையுங்கள்",
      },
      // Service Detail Page
      services: {
        backToServices: "சேவைகளுக்கு திரும்பு",
        processingTime: "மதிப்பிடப்பட்ட செயலாக்க நேரம்",
        serviceFee: "சேவை கட்டணம்",
        applyButton: "ஆன்லைனில் விண்ணப்பிக்கவும்",
        checklistButton: "ஆவண பட்டியல்",
        applicationSteps: "விண்ணப்ப படிகள்",
        nextService: "அடுத்த சேவை",
        relatedServices: "தொடர்புடைய சேவைகள்",
        needHelp: "உதவி தேவையா?",
        contactSupport: "ஆதரவுடன் தொடர்பு கொள்ளுங்கள்",
        notFound: {
          title: "சேவை கிடைக்கவில்லை",
          description: "கோரப்பட்ட சேவை கிடைக்கவில்லை.",
          backToServices: "சேவைகளுக்கு திரும்பு",
        },
        // Passport Service
        passport: {
          title: "பாஸ்போர்ட் விண்ணப்பம்",
          description:
            "புதிய பாஸ்போர்ட்டுக்கு விண்ணப்பிக்கவும் அல்லது உங்கள் இருக்கும் இலங்கை பாஸ்போர்ட்டை புதுப்பிக்கவும்.",
          processingTime: "5-7 வேலை நாட்கள்",
          fee: "ரூ. 10,000",
          applyButton: "ஆன்லைனில் விண்ணப்பிக்கவும்",
          checklistButton: "ஆவண பட்டியல்",
          steps: {
            checkEligibility: {
              title: "தகுதியை சரிபார்க்கவும்",
              description:
                "பாஸ்போர்ட் விண்ணப்பத்திற்கான அடிப்படை தேவைகளை நீங்கள் பூர்த்தி செய்கிறீர்கள் என்பதை சரிபார்க்கவும்.",
              details:
                "நீங்கள் இலங்கை குடிமகன் என்பதை, பாஸ்போர்ட் விண்ணப்பத்திற்கு சரியான காரணம் உள்ளது என்பதை மற்றும் வயது தேவைகளை பூர்த்தி செய்கிறீர்கள் என்பதை உறுதிப்படுத்தவும்.",
            },
            gatherDocuments: {
              title: "தேவையான ஆவணங்களை சேகரிக்கவும்",
              description:
                "உங்கள் பாஸ்போர்ட் விண்ணப்பத்திற்கு தேவையான அனைத்து ஆவணங்களையும் சேகரிக்கவும்.",
              details:
                "உங்களுக்கு உங்கள் தேசிய அடையாள அட்டை, பிறப்பு சான்றிதழ், முந்தைய பாஸ்போர்ட் (இருந்தால்) மற்றும் பாஸ்போர்ட் அளவு புகைப்படங்கள் தேவை.",
            },
            completeForm: {
              title: "விண்ணப்ப படிவத்தை நிரப்பவும்",
              description:
                "பாஸ்போர்ட் விண்ணப்ப படிவத்தை துல்லியமாக நிரப்பவும்.",
              details:
                "படிவத்தின் அனைத்து பிரிவுகளையும் நிரப்பவும், அனைத்து தகவல்களும் சரியானவை என்பதையும் உங்கள் ஆதரவு ஆவணங்களுடன் பொருந்துகிறது என்பதையும் உறுதிப்படுத்தவும்.",
            },
            submitPay: {
              title: "சமர்ப்பித்து பணம் செலுத்தவும்",
              description:
                "உங்கள் விண்ணப்பத்தை சமர்ப்பித்து தேவையான கட்டணத்தை செலுத்தவும்.",
              details:
                "அனைத்து ஆவணங்களுடன் உங்கள் முழுமையான விண்ணப்பத்தை சமர்ப்பித்து ரூ. 10,000 செயலாக்க கட்டணத்தை செலுத்தவும்.",
            },
          },
        },
        // NIC Service
        nic: {
          title: "தேசிய அடையாள அட்டை",
          description:
            "புதிய தேசிய அடையாள அட்டைக்கு விண்ணப்பிக்கவும் அல்லது உங்கள் இருக்கும் ஒன்றை புதுப்பிக்கவும்.",
          processingTime: "10-14 வேலை நாட்கள்",
          fee: "ரூ. 500",
          applyButton: "ஆன்லைனில் விண்ணப்பிக்கவும்",
          checklistButton: "ஆவண பட்டியல்",
          steps: {
            checkEligibility: {
              title: "தகுதியை சரிபார்க்கவும்",
              description:
                "தேசிய அடையாள அட்டை விண்ணப்பத்திற்கான தேவைகளை நீங்கள் பூர்த்தி செய்கிறீர்கள் என்பதை சரிபார்க்கவும்.",
              details:
                "நீங்கள் இலங்கை குடிமகன் என்பதையும் குறைந்தபட்ச வயது தேவையான 16 வயதை பூர்த்தி செய்கிறீர்கள் என்பதையும் உறுதிப்படுத்தவும்.",
            },
            gatherDocuments: {
              title: "தேவையான ஆவணங்களை சேகரிக்கவும்",
              description:
                "உங்கள் தேசிய அடையாள அட்டை விண்ணப்பத்திற்கு தேவையான அனைத்து ஆவணங்களையும் சேகரிக்கவும்.",
              details:
                "உங்களுக்கு உங்கள் பிறப்பு சான்றிதழ், முந்தைய தேசிய அடையாள அட்டை (இருந்தால்) மற்றும் பாஸ்போர்ட் அளவு புகைப்படங்கள் தேவை.",
            },
            completeForm: {
              title: "விண்ணப்ப படிவத்தை நிரப்பவும்",
              description:
                "தேசிய அடையாள அட்டை விண்ணப்ப படிவத்தை துல்லியமாக நிரப்பவும்.",
              details:
                "படிவத்தின் அனைத்து பிரிவுகளையும் நிரப்பவும், அனைத்து தகவல்களும் சரியானவை என்பதையும் உங்கள் ஆதரவு ஆவணங்களுடன் பொருந்துகிறது என்பதையும் உறுதிப்படுத்தவும்.",
            },
            submitPay: {
              title: "சமர்ப்பித்து பணம் செலுத்தவும்",
              description:
                "உங்கள் விண்ணப்பத்தை சமர்ப்பித்து தேவையான கட்டணத்தை செலுத்தவும்.",
              details:
                "அனைத்து ஆவணங்களுடன் உங்கள் முழுமையான விண்ணப்பத்தை சமர்ப்பித்து ரூ. 500 செயலாக்க கட்டணத்தை செலுத்தவும்.",
            },
          },
        },
        // Other Services
        birthCertificate: {
          title: "பிறப்பு சான்றிதழ்",
        },
        marriageCertificate: {
          title: "திருமண சான்றிதழ்",
        },
        policeClearance: {
          title: "காவல்துறை அனுமதி",
        },
      },
      // About Page
      about: {
        hero: {
          title: "TalkGov பற்றி",
          subtitle:
            "டிஜிட்டல் புதுமை மற்றும் குடிமக்கள்-மைய வடிவமைப்பு மூலம் அரசு சேவைகளை மாற்றுதல்",
        },
        stats: {
          users: "செயலில் உள்ள பயனர்கள்",
          services: "அரசு சேவைகள்",
          support: "ஆதரவு கிடைக்கும்",
          languages: "ஆதரிக்கப்படும் மொழிகள்",
        },
        mission: {
          title: "எங்கள் பணி",
          description:
            "அரசு சேவைகளுடன் குடிமக்கள் எவ்வாறு தொடர்பு கொள்கிறார்கள் என்பதை புரட்சிகரமாக மாற்றுவதற்கு நாங்கள் உறுதியாக உள்ளோம், ஒரு தடையற்ற, அணுகக்கூடிய மற்றும் பயனர்-நட்பு டிஜிட்டல் தளத்தை வழங்குவதன் மூலம்.",
          point1: {
            title: "டிஜிட்டல் மாற்றம்",
            description:
              "நவீன தொழில்நுட்பம் மற்றும் பயனர்-மைய வடிவமைப்பு கொள்கைகள் மூலம் அரசு சேவைகளை நவீனமயமாக்குதல்.",
          },
          point2: {
            title: "குடிமக்கள் அதிகாரமளித்தல்",
            description:
              "அரசு சேவைகளுக்கு எளிதான அணுகல் மற்றும் வெளிப்படையான செயல்முறைகளுடன் குடிமக்களை அதிகாரமளித்தல்.",
          },
          point3: {
            title: "உள்ளடக்கிய அணுகல்",
            description:
              "அவர்களின் தொழில்நுட்ப நிபுணத்துவம் அல்லது இருப்பிடம் இருந்தபோதிலும் அனைத்து குடிமக்களும் அரசு சேவைகளுக்கு அணுக முடியும் என்பதை உறுதிப்படுத்துதல்.",
          },
          visual: {
            title: "எதிர்காலத்தை கட்டமைத்தல்",
            description:
              "இலங்கையின் அனைத்து குடிமக்களுக்கும் மிகவும் இணைக்கப்பட்ட மற்றும் திறமையான அரசு சூழலியலை உருவாக்குதல்.",
          },
        },
        values: {
          title: "எங்கள் மதிப்புகள்",
          subtitle: "நாங்கள் செய்யும் அனைத்தையும் வழிநடத்தும் கொள்கைகள்",
          transparency: {
            title: "வெளிப்படைத்தன்மை",
            description:
              "எங்கள் குடிமக்களுடன் நம்பிக்கையை உருவாக்கும் திறந்த, நேர்மையான தகவல்தொடர்பு மற்றும் வெளிப்படையான செயல்முறைகளில் நாங்கள் நம்பிக்கை கொள்கிறோம்.",
          },
          accessibility: {
            title: "அணுகக்கூடிய தன்மை",
            description:
              "அவர்களின் திறன்கள் அல்லது சூழ்நிலைகள் இருந்தபோதிலும் அனைவருக்கும் அரசு சேவைகளை அணுகக்கூடியதாக மாற்றுதல்.",
          },
          innovation: {
            title: "புதுமை",
            description:
              "எங்கள் பயனர்களுக்கு சிறந்த சாத்தியமான அனுபவத்தை வழங்க தொடர்ந்து மேம்படுத்துதல் மற்றும் புதுமை செய்தல்.",
          },
          service: {
            title: "சேவை சிறப்பு",
            description:
              "சிறந்த சேவை தரத்தை வழங்குவதற்கும் குடிமக்களின் எதிர்பார்ப்புகளை மீறுவதற்கும் உறுதியாக உள்ளோம்.",
          },
        },
        features: {
          title: "தள அம்சங்கள்",
          subtitle:
            "உங்கள் அரசு சேவை அனுபவத்தை எளிதாக்க வடிவமைக்கப்பட்ட சக்திவாய்ந்த கருவிகள்",
          mobile: {
            title: "மொபைல்-முதல் வடிவமைப்பு",
            description:
              "எந்தவொரு திரை அளவிலும் சரியாக செயல்படும் பதிலளிக்கும் வடிவமைப்புடன் மொபைல் சாதனங்களுக்கு மேம்படுத்தப்பட்டது.",
          },
          security: {
            title: "நிறுவன பாதுகாப்பு",
            description:
              "உங்கள் தனிப்பட்ட தகவல்களை பாதுகாக்கவும் தரவு தனியுரிமையை உறுதிப்படுத்தவும் வங்கி-நிலை பாதுகாப்பு நடவடிக்கைகள்.",
          },
          analytics: {
            title: "நிகழ்நேர பகுப்பாய்வு",
            description:
              "உங்கள் விண்ணப்ப நிலையை கண்காணித்து உங்கள் அரசு சேவை கோரிக்கைகள் பற்றி நிகழ்நேர புதுப்பிப்புகளை பெறுங்கள்.",
          },
          support: {
            title: "24/7 ஆதரவு",
            description:
              "உங்களுக்கு இருக்கக்கூடிய எந்தவொரு கேள்வி அல்லது பிரச்சினையிலும் உங்களுக்கு உதவுவதற்கு நாள்-இரவு வாடிக்கையாளர் ஆதரவு.",
          },
        },
        technology: {
          title: "தொழில்நுட்ப அடுக்கு",
          subtitle:
            "உகந்த செயல்திறன் மற்றும் பாதுகாப்புக்காக நவீன, நம்பகமான தொழில்நுட்பங்களுடன் கட்டமைக்கப்பட்டது",
          frontend: {
            title: "முன்-இறுதி தொழில்நுட்பங்கள்",
          },
          backend: {
            title: "பின்-இறுதி தொழில்நுட்பங்கள்",
          },
          database: {
            title: "தரவுத்தளம் மற்றும் சேமிப்பு",
          },
        },
        cta: {
          title: "அரசு சேவைகளின் எதிர்காலத்தை அனுபவிக்க தயாரா?",
          description:
            "டிஜிட்டல் அரசு சேவைகளின் வசதியை ஏற்கனவே கண்டுபிடித்த ஆயிரக்கணக்கான குடிமக்களுடன் சேரவும்.",
          contactButton: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
          servicesButton: "சேவைகளை ஆராயுங்கள்",
        },
      },
      // Footer
      footer: {
        description:
          "இலங்கை அரசு சேவைகளுக்கு உங்கள் நுழைவாயில். எளிமையான, வேகமான மற்றும் அணுகக்கூடிய.",
        quickLinks: "விரைவு இணைப்புகள்",
        legal: "சட்டப்பூர்வ",
        feedback: "கருத்து",
        privacyPolicy: "தனியுரிமை கொள்கை",
        termsOfService: "சேவை விதிமுறைகள்",
        accessibility: "அணுகக்கூடிய தன்மை",
        copyright: "© 2025 TalkGov. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      },
      // Chatbot
      chatbot: {
        title: "TalkGov உதவியாளர்",
        status: "ஆன்லைனில்",
        welcomeMessage:
          "வணக்கம்! இன்று அரசு சேவைகள் பற்றி உங்களுக்கு எவ்வாறு உதவ முடியும்?",
        inputPlaceholder: "உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...",
        response1:
          "அரசு சேவைகள் பற்றிய தகவல்களை கண்டுபிடிக்க நான் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
        response2:
          "பாஸ்போர்ட், தேசிய அடையாள அட்டை மற்றும் ஓட்டுநர் உரிமம் போன்ற பல்வேறு சேவைகளுக்கு நீங்கள் எங்கள் தளத்தின் மூலம் விண்ணப்பிக்கலாம்.",
        response3:
          "ஆவண தேவைகளில் உதவி தேவையா? செயல்முறையில் நான் உங்களுக்கு வழிகாட்ட முடியும்.",
        response4:
          "மேலும் விரிவான உதவிக்கு, நீங்கள் எங்கள் ஆதரவு குழுவுடன் தொடர்பு கொள்ளலாம் அல்லது எங்கள் உதவி மையத்தை பார்வையிடலாம்.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
