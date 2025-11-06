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
      address: string
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

  // Partners
  partners: {
    title: string
    subtitle: string
  }

  // Memberships
  memberships: {
    title: string
    subtitle: string
    cards: {
      fiata: {
        title: string
        description: string
      }
      wca: {
        title: string
        description: string
      }
      tct: {
        title: string
        description: string
      }
      iata: {
        title: string
        description: string
      }
    }
  }

  // Road Freight
  roadFreight: {
    fullTrailer: {
      title: string
      description: string
    }
    groupage: {
      title: string
      description: string
    }
  }

  // Air Freight
  airFreight: {
    services: {
      title: string
      description: string
    }
  }

  // Rail Freight
  railFreight: {
    fullContainer: {
      title: string
      description: string
    }
    groupage: {
      title: string
      description: string
    }
  }

  // Brokerage
  brokerage: {
    services: {
      title: string
      description: string
    }
  }

  // Warehouse
  warehouse: {
    services: {
      title: string
      description: string
    }
  }

  // Sea Freight
  seaFreight: {
    fullContainer: {
      title: string
      description: string
    }
    groupage: {
      title: string
      description: string
    }
  }

  // Calculator
  calculator: {
    title: string
    subtitle: string
    packingType: string
    quantity: string
    dimensions: string
    length: string
    width: string
    height: string
    weight: string
    transportMode: string
    calculate: string
    reset: string
    placeholder: string
    results: {
      title: string
      totalVolume: string
      loadingMeters: string
      chargeableWeight: string
    }
    packingTypes: {
      choose: string
      miniPallet: string
      euroPallet: string
      blockPallet: string
      custom: string
    }
    transportModes: {
      airFreight: string
      courier: string
      seaFreight: string
      truck: string
    }
    units: {
      cm: string
      kg: string
      cbm: string
      ldm: string
      pieces: string
    }
  }

  // Error Pages
  errors?: {
    pageNotFound?: {
      title: string
      message: string
      goHome: string
      goBack: string
      helpfulLinks: string
    }
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
      title: "OUR",
      subtitle: "SERVICES",
      services: {
        seaFreight: {
          title: "SEA FREIGHT",
          description: "Cost-effective ocean shipping solutions for your cargo worldwide with reliable transit times."
        },
        airFreight: {
          title: "AIR FREIGHT",
          description: "Fast and secure air cargo services for time-sensitive shipments across the globe."
        },
        railFreight: {
          title: "RAIL FREIGHT",
          description: "Eco-friendly rail transport solutions connecting major trade routes efficiently."
        },
        roadFreight: {
          title: "ROAD FREIGHT",
          description: "Flexible trucking services for door-to-door delivery across regional networks."
        },
        warehouse: {
          title: "WAREHOUSING",
          description: "Modern storage facilities with inventory management and distribution services."
        },
        brokerage: {
          title: "CUSTOMS BROKERAGE",
          description: "Expert customs clearance and trade compliance services to expedite your shipments."
        }
      }
    },
    contact: {
      title: "GET IN",
      titleHighlight: "TOUCH",
      subtitle: "LET'S BUILD YOUR LOGISTICS SOLUTION",
      description: "Our team is ready to optimize your supply chain and accelerate your business growth.",
      form: {
        title: "SEND US A MESSAGE",
        firstName: "First Name",
        lastName: "Last Name", 
        email: "E-mail ",
        phone: "Phone Number",
        service: "Service Interest",
        message: "Message",
        messagePlaceholder: "Tell us about your logistics needs...",
        sendButton: "Send Message",
        sending: "Sending...",
        selectService: "Select Service"
      },
      details: {
        followUs: "Follow Us",
        address: "Tbilisi. G. Kartozia #8"
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
    },
    partners: {
      title: "WITH LEADING GLOBAL",
      subtitle: "CARRIERS"
    },
    memberships: {
      title: "GLOBAL NETWORK",
      subtitle: "MEMBERSHIPS",
      cards: {
        fiata: {
          title: "FIATA",
          description: "International Federation of Freight Forwarders Associations - Global network ensuring highest standards in freight forwarding."
        },
        wca: {
          title: "WCA",
          description: "World Cargo Alliance - Leading global logistics network connecting trusted independent freight forwarders worldwide."
        },
        tct: {
          title: "TCT",
          description: "The Cooperative Team - International network of logistics professionals providing comprehensive freight forwarding solutions."
        },
        iata: {
          title: "IATA",
          description: "International Air Transport Association - Trusted partner ensuring safe, secure and efficient air cargo operations."
        }
      }
    },
    roadFreight: {
      fullTrailer: {
        title: "FULL TRUCK TRANSPORTATION (FTL)",
        description: "Europe\nTurkey\nChina\nAzerbaijan\nArmenia\nBelarus\nUkraine\nRussia\nCentral Asian Countries"
      },
      groupage: {
        title: "GROUPAGE CARGO TRANSPORTATION (LTL)",
        description: "Shared warehouses located in:\n• Europe\n• China\n• Turkey\n• Ukraine\n• Russia"
      }
    },
    airFreight: {
      services: {
        title: "AIR FREIGHT SERVICES",
        description: "• From any point in the world to any destination\n• Dry general cargo transportation\n• Temperature-controlled cargo transportation\n Dangerous cargo"
      }
    },
    railFreight: {
      fullContainer: {
        title: "FULL CONTAINER TRANSPORTATION (FCL)",
        description: "• Countries: China, Kazakhstan, Azerbaijan\n• Transportation: 40-foot containers\n• Non-hazardous cargo only\n• Any terms: EXW, FCA"
      },
      groupage: {
        title: "GROUPAGE CONTAINER TRANSPORTATION (LCL)",
        description: "• Country: From China\n• Transportation: 40-foot containers\n• Non-hazardous cargo only\n• Any terms: EXW, FCA"
      }
    },
    brokerage: {
      services: {
        title: "CUSTOMS BROKERAGE SERVICES",
        description: "• Import, export & transit declarations\n• Document verification (Invoice, Packing List, CMR, BL, AWB, RWB)\n• HS code classification & consultancy\n• Temporary import/export handling\n• Representation at customs & coordination with terminals\n• Preparation of certificates (EUR1, EX1, T1)"
      }
    },
    warehouse: {
      services: {
        title: "WAREHOUSE SERVICES",
        description: "• Global partner network for temporary storage\n• ⁠24/7 security and monitoring\n• Modern, fully equipped warehouses"
      }
    },
    seaFreight: {
      fullContainer: {
        title: "FULL CONTAINER TRANSPORTATION (FCL)",
        description: "• From any country worldwide\n• We operate under EXW, FCA, FOB, and DAP terms "
      },
      groupage: {
        title: "GROUPAGE CONTAINER TRANSPORTATION (LCL)",
        description: "• From China, India, South Korea\n• Major consolidation ports: Qingdao, Ningbo, Shenzhen, Shanghai, Guangzhou, Mumbai, Busan\n• We operate under EXW, FCA, FOB, and DAP terms"
      }
    },
    calculator: {
      title: "CARGO",
      subtitle: "CALCULATOR",
      packingType: "Packing Type",
      quantity: "Quantity",
      dimensions: "Dimensions",
      length: "Length",
      width: "Width", 
      height: "Height",
      weight: "Weight",
      transportMode: "Transport Mode",
      calculate: "Calculate",
      reset: "Reset",
      placeholder: "Fill in the form and click calculate to see results",
      results: {
        title: "CALCULATION RESULTS",
        totalVolume: "Total Volume",
        loadingMeters: "Loading Meters",
        chargeableWeight: "Chargeable Weight"
      },
      packingTypes: {
        choose: "Choose",
        miniPallet: "Mini Pallet",
        euroPallet: "Euro Pallet",
        blockPallet: "Block Pallet",
        custom: "Custom"
      },
      transportModes: {
        airFreight: "Air Freight",
        courier: "Courier",
        seaFreight: "Sea Freight",
        truck: "Truck"
      },
      units: {
        cm: "cm",
        kg: "KG",
        cbm: "CBM",
        ldm: "LDM",
        pieces: "pcs"
      }
    },
    errors: {
      pageNotFound: {
        title: "PAGE NOT FOUND",
        message: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        goHome: "GO HOME",
        goBack: "GO BACK",
        helpfulLinks: "YOU MIGHT BE LOOKING FOR:"
      }
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
      description: " 2009 წლიდან არის თქვენი სანდო პარტნიორი გადაზიდვების სფეროში. ჩვენი გამოცდილი პროფესიონალების გუნდი წლებია მუშაობს საერთაშორისო ტვირთის ტრანსპორტირების სფეროში, რაც უზრუნველყოფს თქვენი ტვირთის დროულ და უსაფრთხო მიწოდებას. ჩვენ მუდამ მზად ვართ შემოგთავაზოთ ოპტიმალური ლოგისტიკური გადაწყვეტილება და საუკეთესო ტარიფი, სრულად მორგებული თქვენს საჭიროებებზე",
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
          description: "ბიუჯეტური და უსაფრთხო საზღვაო გადაზიდვები მსოფლიოს მასშტაბით"
        },
        airFreight: {
          title: "საჰაერო გადაზიდვა",
          description: "გადაზიდვები საჰაერო გზით - სწრაფად, უსაფრთხოდ, მსოფლიოს მასშტაბით "
        },
        railFreight: {
          title: "სარკინიგზო გადაზიდვა", 
          description: " სარკინიგზო გადაზიდვები - უსაფრთხოდ, სწრაფად და ეფექტურად"
        },
        roadFreight: {
          title: "სახმელეთო გადაზიდვა",
          description: "რეგიონული და კარიდან - კარამდე  გადაზიდვები - სწრაფად და ბიუჯეტურად"
        },
        warehouse: {
          title: "სასაწყობე მომსახურება",
          description: "საწყობები 24/7 მონიტორინგით მსოფლიოს მასშტაბით" 
        },
        brokerage: {
          title: "საბროკერო მომსახურება",
          description: "პროფესიონალური საბაჟო მომსახურება თქვენი ტვირთის დროული გაფორმებისთვის"
        }
      }
    },
    contact: {
      titleHighlight: "დაგვიკავშირდით",
      subtitle: "თქვენზე მორგებული  მომსახურებისთვის",
      description: "ერთად ავაწყოთ შენზე მორგებული ლოგისტიკური სისტემა",
      form: {
        title: "გამოგვიგზავნეთ შეტყობინება",
        firstName: "სახელი",
        lastName: "გვარი",
        email: "ელ-ფოსტის მისამართი", 
        phone: "ტელეფონის ნომერი",
        service: "სერვისის ინტერესი",
        message: "შეტყობინება",
        messagePlaceholder: "გვიამბეთ თქვენი საჭიროებების შესახებ...",
        sendButton: "გაგზავნა",
        sending: "იგზავნება...",
        selectService: "აირჩიეთ სერვისი"
      },
      details: {
        followUs: "გამოგვყევით",
        address: "თბილისი. გ. კარტოზიას #8"
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
    },
    partners: {
      title: "გლობალურ ლიდერებთან",
      subtitle: "თანამშრომლობა"
    },
    memberships: {
      title: "პარტნიორი",
      subtitle: "ქსელები",
      cards: {
        fiata: {
          title: "FIATA",
          description: "საერთაშორისო სატვირთო ექსპედიტორთა ფედერაციების ასოციაცია - გლობალური ქსელი, რომელიც უზრუნველყოფს უმაღლეს სტანდარტებს სატვირთო ექსპედიციაში."
        },
        wca: {
          title: "WCA",
          description: "მსოფლიო ტვირთების ალიანსი - წამყვანი გლობალური ლოგისტიკური ქსელი, რომელიც აერთიანებს სანდო დამოუკიდებელ სატვირთო ექსპედიტორებს მთელ მსოფლიოში."
        },
        tct: {
          title: "TCT",
          description: "სათანამშრომლო გუნდი - ლოგისტიკის პროფესიონალთა საერთაშორისო ქსელი, რომელიც უზრუნველყოფს ყოვლისმომცველ სატვირთო გადაზიდვის გადაწყვეტილებებს."
        },
        iata: {
          title: "IATA",
          description: "საერთაშორისო საჰაერო ტრანსპორტის ასოციაცია - სანდო პარტნიორი, რომელიც უზრუნველყოფს უსაფრთხო და ეფექტურ საჰაერო ტვირთების ოპერაციებს."
        }
      }
    },
    roadFreight: {
      fullTrailer: {
        title: "სრული ტრაილერებით ტრანსპორტირება",
        description: "ევროპა\nთურქეთი\nჩინეთი\nაზერბაიჯანი\nსომხეთი\nბელარუსი\nუკრაინა\nრუსეთი\nშუა აზიის ქვეყნები"
      },
      groupage: {
        title: "ნაკრები ტვირთების ტრანსპორტირება",
        description: "გაზიარებული საწყობები მდებარეობს:\n• ევროპა\n• ჩინეთი\n• თურქეთი\n• უკრაინა\n• რუსეთი"
      }
    },
    airFreight: {
      services: {
        title: "საჰაერო გადაზიდვები",
        description: "• მსოფლიოს ნებისმიერი წერტილიდან ნებისმიერ დანიშნულების ადგილზე\n• მშრალი ზოგადი ტვირთების ტრანსპორტირება\n• ტემპერატურით კონტროლირებადი ტვირთების ტრანსპორტირება\n• სახიფათო ტვირთები"
      }
    },
    railFreight: {
      fullContainer: {
        title: "სრული კონტეინერებით",
        description: "• ქვეყანა: ჩინეთი, ყაზახეთი, აზერბაიჯანი\n• ტრანსპორტირება: 40 ფუტიანი კონტეინერებით\n• მხოლოდ არასახიფათო ტვირთების\n• ნებისმიერი პირობით EXW, FCA"
      },
      groupage: {
        title: "ნაკრები კონტეინერებით",
        description: "• ქვეყანა: ჩინეთიდან\n• ტრანსპორტირება: 40 ფუტიანი კონტეინერებით\n• მხოლოდ არასახიფათო ტვირთების\n• ნებისმიერი პირობით EXW, FCA"
      }
    },
    brokerage: {
      services: {
        title: "საბროკერო მომსახურება",
        description: "• იმპორტის, ექსპორტისა და ტრანზიტის დეკლარაციები\n• დოკუმენტების გადამოწმება (Invoice, Packing List, CMR, BL, AWB, RWB)\n• HS კოდების კლასიფიკაცია და კონსულტაცია\n• დროებითი იმპორტი/ექსპორტის მართვა\n• წარმომადგენლობა საბაჟოში და ტერმინალებთან კოორდინაცია\n• სერთიფიკატების მომზადება (EUR1, EX1, T1)"
      }
    },
    warehouse: {
      services: {
        title: "სასაწყობე მომსახურება",
        description: "• გლობალური პარტნიორთა ქსელის გამოყენებით შეგვიძლია ტვირთის დროებითი დასაწყობება მსოფლიოს ნებისმიერ ქვეყანაში\n• 24/7 მონიტორინგი\n• უსაფრთხო და გამართული საწყობები"
      }
    },
    seaFreight: {
      fullContainer: {
        title: "სრული საზღვაო კონტეინერებით ტრანსპორტირება",
        description: "• მსოფლიოს ნებისმიერი ქვეყნიდან\n• ვმუშაობთ EXW, FCA, FOB და DAP პირობებით"
      },
      groupage: {
        title: "ნაკრები საზღვაო კონტეინერებით ტრანსპორტირება",
        description: "• ჩინეთიდან, ინდოეთიდან, სამხრეთ კორეიდან\n• ძირითადი კონსოლიდაციის პორტები: Qingdao, Ningbo, Shenzhen, Shanghai, Guangzhou, Mumbai, Busan\n• ვმუშაობთ EXW, FCA, FOB და DAP პირობებით"
      }
    },
    calculator: {
      title: "ტვირთის",
      subtitle: "კალკულატორი",
      packingType: "შეფუთვის ტიპი",
      quantity: "რაოდენობა",
      dimensions: "ზომები",
      length: "სიგრძე",
      width: "სიგანე",
      height: "სიმაღლე", 
      weight: "წონა ერთეულზე",
      transportMode: "ტრანსპორტის რეჟიმი",
      calculate: "გამოთვლა",
      reset: "გასუფთავება",
      placeholder: "შეავსეთ ფორმა და დააწკაპუნეთ გამოთვლაზე შედეგების სანახავად",
      results: {
        title: "გამოთვლის შედეგები",
        totalVolume: "მოცულობა",
        loadingMeters: "გრძივი მეტრი",
        chargeableWeight: "მოცულობითი წონა"
      },
      packingTypes: {
        choose: "აირჩიეთ",
        miniPallet: "მინი პალეტი",
        euroPallet: "ევრო პალეტი", 
        blockPallet: "ბლოკ პალეტი",
        custom: "მორგებული"
      },
      transportModes: {
        airFreight: "საჰაერო",
        courier: "კურიერი",
        seaFreight: "საზღვაო",
        truck: "ტრანსპორტი"
      },
      units: {
        cm: "სმ",
        kg: "კგ",
        cbm: "კუბ.მ",
        ldm: "დმ",
        pieces: "ცალი"
      }
    },
    errors: {
      pageNotFound: {
        title: "გვერდი ვერ მოიძებნა",
        message: "თქვენს მიერ მოძებნული გვერდი შესაძლოა წაშლილი იყოს, შეცვლილი სახელი ჰქონდეს ან დროებით მიუწვდომელი იყოს.",
        goHome: "მთავარ გვერდზე",
        goBack: "უკან დაბრუნება",
        helpfulLinks: "შესაძლოა ეძებთ:"
      }
    }
  }
}

export type Language = 'en' | 'ka'