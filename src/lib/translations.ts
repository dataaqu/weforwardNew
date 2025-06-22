// Georgian translation data
export interface Translations {
  // Navigation
  nav: {
    home: string
    services: string
    contact: string
    blog: string
  }
  
  // Hero Section
  hero: {
    description: string
    stats: {
      cargoShipped: string
      trustedPartners: string
      happyCustomers: string
    }
  }
  
  // Services
  services: {
    title: string
    subtitle: string
    services: {
      seaFreight: {
        title: string
        description: string
      }
      airFreight: {
        title: string
        description: string
      }
      railFreight: {
        title: string
        description: string
      }
      roadFreight: {
        title: string
        description: string
      }
      warehouse: {
        title: string
        description: string
      }
      brokerage: {
        title: string
        description: string
      }
    }
  }
  
  // Contact
  contact: {
    title?: string
    titleHighlight: string
    subtitle: string
    description: string
    form: {
      title: string
      firstName: string
      lastName: string
      email: string
      phone: string
      service: string
      message: string
      messagePlaceholder: string
      sendButton: string
      sending: string
      selectService: string
    }
    details: {
      followUs: string
    }
    success: {
      title: string
      message: string
      button: string
    }
    error: {
      message: string
    }
  }
  
  // Footer
  footer: {
    copyright: string
  }
  
  // Blog
  blog: {
    title: string
    subtitle: string
  }
}

export const translations: { en: Translations; ka: Translations } = {
  en: {
    nav: {
      home: "Home",
      services: "Services", 
      contact: "Contact",
      blog: "Blog"
    },
    hero: {
      description: "Streamline your supply chain with our comprehensive logistics solutions. From air and sea freight to warehousing and customs brokerage.",
      stats: {
        cargoShipped: "Cargo shipped",
        trustedPartners: "Trusted Partners",
        happyCustomers: "Happy Customers"
      }
    },
    services: {
      title: "Our",
      subtitle: "Services",
      services: {
        seaFreight: {
          title: "Sea Freight",
          description: "Cost-effective ocean shipping solutions for your cargo worldwide with reliable transit times."
        },
        airFreight: {
          title: "Air Freight", 
          description: "Fast and secure air cargo services for time-sensitive shipments across the globe."
        },
        railFreight: {
          title: "Rail Freight",
          description: "Eco-friendly rail transport solutions connecting major trade routes efficiently."
        },
        roadFreight: {
          title: "Road Freight",
          description: "Flexible trucking services for door-to-door delivery across regional networks."
        },
        warehouse: {
          title: "Warehousing",
          description: "Modern storage facilities with inventory management and distribution services."
        },
        brokerage: {
          title: "Customs Brokerage", 
          description: "Expert customs clearance and trade compliance services to expedite your shipments."
        }
      }
    },
    contact: {
      title: "Get In",
      titleHighlight: "Touch",
      subtitle: "Let's Build Your Logistics Solution",
      description: "Our team is ready to optimize your supply chain and accelerate your business growth.",
      form: {
        title: "Send us a Message",
        firstName: "First Name",
        lastName: "Last Name", 
        email: "Email Address",
        phone: "Phone Number",
        service: "Service Interest",
        message: "Message",
        messagePlaceholder: "Tell us about your logistics needs...",
        sendButton: "Send Message",
        sending: "Sending...",
        selectService: "Select Service"
      },
      details: {
        followUs: "Follow Us"
      },
      success: {
        title: "Message Sent Successfully!",
        message: "Thank you! Your inquiry has been successfully received. Our team will contact you shortly with more detailed information. We appreciate you choosing us!",
        button: "Thank You!"
      },
      error: {
        message: "Failed to send message. Please try again or contact us directly."
      }
    },
    footer: {
      copyright: "All rights reserved."
    },
    blog: {
      title: "Under Construction",
      subtitle: "We're working hard to bring you amazing content about logistics trends and industry insights. Stay tuned for updates!"
    }
  },
  ka: {
    nav: {
      home: "მთავარი",
      services: "სერვისები",
      contact: "კონტაქტი", 
      blog: "ბლოგი"
    },
    hero: {
      description: " 2009 წლიდან არის თქვენი საიმედო პარტნიორი გადაზიდვების სფეროში. პროფესიონალების გუნდი, რომელიც წლებია ტვირთის ტრანსპორტირების სფეროში მოღვაწეობენ თქვენი ტვირთის დროული და უსაფრთხო მიწოდების გარანტია. ჩვენ კი მუდამ მზად ვართ შემოგთავაზოთ სწორი ლოგისტიკური გადაწყვეტილება და საუკეთესო ტარიფი, რომელიც მაქსიმალურად იქნება მორგებული თქვენს საჭიროებებზე.",
      stats: {
        cargoShipped: "გადაზიდული ტვირთი",
        trustedPartners: "სანდო პარტნიორები",
        happyCustomers: "კმაყოფილი მომხმარებლები"
      }
    },
    services: {
      title: "ჩვენი",
      subtitle: "სერვისები",
      services: {
        seaFreight: {
          title: "საზღვაო გადაზიდვა",
          description: "საზღვაო გადაზიდვის მომსახურება უზრუნველყოფს მსხვილმასშტაბიანი ნაწარმის ეკონომიურ და სანდო გადაზიდვას ნებისმიერ პორტში მსოფლიოს ოკეანეების გავლით, როგორ FCL ასევე LCL დატვირთვით."
        },
        airFreight: {
          title: "საჰაერო გადაზიდვა",
          description: "გთავაზობთ სანდო და ეფექტურ საჰაერო გადაზიდვების სერვისს, რომელიც უზრუნველყოფს თქვენი ნაწარმის უსაფრთხო და დროულ მიწოდებას ყველა კონტინენტზე. "
        },
        railFreight: {
          title: "სარკინიგზო გადაზიდვა", 
          description: " სარკინიგზო გადაზიდვები  იდეალურია მსხვილი და მძიმე ტვირთებისთვის. ჩვენ გვაქვს პარტნიორული ურთიერთობები რეგიონის ძირითად სარკინიგზო კომპანიებთან, რაც უზრუნველყოფს რეგულარულ და სანდო შეერთებებს ევროპა-აზიის კორიდორზე."
        },
        roadFreight: {
          title: "სახმელეთო გადაზიდვა",
          description: "ჩვენი სახმელეთო გადაზიდვის სერვისი უზრუნველყოფს თქვენი ნაწარმის სწრაფ და უსაფრთხო მიწოდებას ევროპისა და აზიის ნებისმიერ ქვეყანაში."
        },
        warehouse: {
          title: "სასაწყობე მომსახურება",
          description: "ჩვენი პარტნიორების თანამედროვე სასაწყობე კომპლექსები აღჭურვილია ავტომატიზებული სისტემებით და უზრუნველყოფს თქვენი ნაწარმის უსაფრთხო შენახვას. გვაქვს როგორც ხანმოკლე, ისე ხანგრძლივი შენახვის შესაძლებლობები." 
        },
        brokerage: {
          title: "საბროკერო მომსახურება",
          description: "ჩვენი გამოცდილი საბროკერო გუნდი უზრუნველყოფს სრულ საბაჟო მომსახურებას იმპორტისა და ექსპორტის ოპერაციებისთვის, მომზადებული ყველა საჭირო დოკუმენტაციასა და ვალუტის რეგულაციების შესაბამისად."
        }
      }
    },
    contact: {
      titleHighlight: "დაგვიკავშირდით",
      subtitle: "თქვენზე მორგებული  მომსახურებისთვის",
      description: "ჩვენი გუნდი მზადაა დაგეხმაროთ დაა თქვენი მიწოდების ჯაჭვი და განავითაროთ თქვენი ბიზნესი.",
      form: {
        title: "გამოგვიგზავნეთ შეტყობინება",
        firstName: "სახელი",
        lastName: "გვარი",
        email: "ელფოსტის მისამართი", 
        phone: "ტელეფონის ნომერი",
        service: "სერვისის ინტერესი",
        message: "შეტყობინება",
        messagePlaceholder: "გვიამბეთ თქვენი საჭიროებების შესახებ...",
        sendButton: "გაგზავნა",
        sending: "იგზავნება...",
        selectService: "აირჩიეთ სერვისი"
      },
      details: {
        followUs: "გამოგვყევით"
      },
      success: {
        title: "შეტყობინება წარმატებით გაიგზავნა!",
        message: "მადლობთ! თქვენი მოთხოვნა წარმატებით მივიღეთ. ჩვენი გუნდი მალე დაგიკავშირდებათ.",
        button: "მადლობა!"
      },
      error: {
        message: "შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ ხელახლა ან დაგვიკავშირდით."
      }
    },
    footer: {
      copyright: "ყველა უფლება დაცულია."
    },
    blog: {
      title: "მშენებლობის პროცესში",
      subtitle: "ჩვენ ვმუშაობთ, რომ მოგაწოდოთ საინტერესო კონტენტი ლოგისტიკის ტენდენციებისა და ინდუსტრიის ინსაიტების შესახებ. დარჩით ჩვენთან განახლებებისთვის!"
    }
  }
}

export type Language = 'en' | 'ka'