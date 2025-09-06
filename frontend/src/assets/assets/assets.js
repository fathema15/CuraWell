import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";

import drug1 from "./drug1.png";
import drug2 from "./drug2.png";
import drug3 from "./drug3.png";
import drug4 from "./drug4.png";
import drug5 from "./drug5.png";
import drug7 from "./drug7.png";
import drug8 from "./drug8.png";
import drug9 from "./drug9.png";
import drug11 from "./drug11.png";
import drug16 from "./drug16.png";
import drug18 from "./drug18.png";
import drug19 from "./drug19.png";
import drug20 from "./drug20.png";

import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

import PainRelief from "./PainRelief.svg";
import Allergy from "./Allergy.svg";
import Antibiotic from "./Antibiotic.svg";
import Antacid from "./Antacid.svg";
import Diabetes from "./Diabetes.svg";
import MentalHealth from "./MentalHealth.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialtyData = [
  {
    specialty: "General physician",
    image: General_physician,
  },
  {
    specialty: "Gynecologist",
    image: Gynecologist,
  },
  {
    specialty: "Dermatologist",
    image: Dermatologist,
  },
  {
    specialty: "Pediatricians",
    image: Pediatricians,
  },
  {
    specialty: "Neurologist",
    image: Neurologist,
  },
  {
    specialty: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const drugCategories = [
  {
    category: "Pain Relief",
    image: PainRelief,
  },
  {
    category: "Allergy",
    image: Allergy,
  },
  {
    category: "Antibiotic",
    image: Antibiotic,
  },
  {
    category: "Antacid",
    image: Antacid,
  },
  {
    category: "Diabetes",
    image: Diabetes,
  },
  {
    category: "Mental Health",
    image: MentalHealth,
  },
  // add more categories as needed
];

export const drugs = [
  {
    _id: "drug1",
    name: "Napa 500 mg",
    company: "Beximco Pharmaceuticals Ltd.",
    image: drug1,
    category: "Pain Relief",
    unit_price: "৳ 1.20",
    strip_price: "৳ 12.00",
    description: "Paracetamol used to relieve fever and pain.",
  },
  {
    _id: "drug2",
    name: "Filmet 200",
    company: "Renata Limited",
    image: drug2,
    category: "Antiparasitic",
    unit_price: "৳ 8.50",
    strip_price: "৳ 85.00",
    description: "Nitazoxanide used to treat protozoal infections.",
  },
  {
    _id: "drug3",
    name: "Seclo 20",
    company: "Square Pharmaceuticals PLC",
    image: drug3,
    category: "Antacid",
    unit_price: "৳ 4.00",
    strip_price: "৳ 40.00",
    description: "Omeprazole used to reduce stomach acid.",
  },
  {
    _id: "drug4",
    name: "Cosec 20",
    company: "Eskayef Pharmaceuticals Ltd.",
    image: drug4,
    category: "Antacid",
    unit_price: "৳ 7.00",
    strip_price: "৳ 70.00",
    description: "Omeprazole for acid reflux and ulcers.",
  },
  {
    _id: "drug5",
    name: "Ketorol 10",
    company: "ACI Limited",
    image: drug5,
    category: "Pain Relief",
    unit_price: "৳ 5.00",
    strip_price: "৳ 50.00",
    description: "Ketorolac for short term moderate to severe pain.",
  },
  {
    _id: "drug7",
    name: "Fexo 180 mg",
    company: "Square Pharmaceuticals PLC",
    image: drug7,
    category: "Allergy",
    unit_price: "৳ 12.00",
    strip_price: "৳ 120.00",
    description: "Fexofenadine for allergy symptom relief.",
  },
  {
    _id: "drug8",
    name: "Monas 10 mg",
    company: "Incepta Pharmaceuticals Ltd.",
    image: drug8,
    category: "Allergy",
    unit_price: "৳ 9.00",
    strip_price: "৳ 90.00",
    description: "Montelukast for asthma and allergy management.",
  },
  {
    _id: "drug11",
    name: "Losectil 20",
    company: "Eskayef Pharmaceuticals Ltd.",
    image: drug11,
    category: "Antacid",
    unit_price: "৳ 6.00",
    strip_price: "৳ 60.00",
    description: "Omeprazole for gastric acid reduction.",
  },
  {
    _id: "drug9",
    name: "Metforomin 500 mg",
    company: "Incepta Pharmaceuticals Ltd.",
    image: drug9,
    category: "Diabetes",
    unit_price: "৳ 1.50",
    strip_price: "৳ 15.00",
    description: "Metformin for blood sugar control.",
  },
  {
    _id: "drug16",
    name: "Avamys Nasal Spray",
    company: "GSK Bangladesh",
    image: drug16, 
    category: "Allergy",
    unit_price: "৳ 450.00",
    strip_price: "৳ 450.00",
    description: "Fluticasone nasal spray used for allergic rhinitis.",
  },
  {
    _id: "drug18",
    name: "Napa Extend 665 mg",
    company: "Beximco Pharmaceuticals Ltd.",
    image: drug18,
    category: "Pain Relief",
    unit_price: "৳ 2.00",
    strip_price: "৳ 20.00",
    description: "Extended release paracetamol for long-lasting pain relief.",
  },
  {
    _id: "drug19",
    name: "Seclo MUPS 20",
    company: "Square Pharmaceuticals PLC",
    image: drug19,
    category: "Antacid",
    unit_price: "৳ 6.00",
    strip_price: "৳ 60.00",
    description: "MUPS Omeprazole used for acid-related disorders.",
  },
  {
    _id: "drug20",
    name: "Maxpro 20",
    company: "Popular Pharmaceuticals Ltd.",
    image: drug20,
    category: "Antacid",
    unit_price: "৳ 6.00",
    strip_price: "৳ 60.00",
    description: "Esomeprazole used to treat GERD and ulcers.",
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    specialty: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    specialty: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    specialty: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    specialty: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    specialty: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    specialty: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Christopher Davis",
    image: doc7,
    specialty: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    specialty: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    specialty: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    specialty: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    specialty: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    specialty: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    specialty: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    specialty: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    specialty: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];
