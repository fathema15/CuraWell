import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import DrugCategoryMenu from '../components/DrugCategoryMenu'
import TopDrugs from '../components/TopDrugs'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <DrugCategoryMenu/>
      <TopDoctors/>
      <TopDrugs/>
      <Banner/>
    </div>
  )
}

export default Home
