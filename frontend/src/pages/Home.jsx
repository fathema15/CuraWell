import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import CategoryMenu from '../components/CategoryMenu'
import TopDrugs from '../components/TopDrugs'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <CategoryMenu/>
      <TopDoctors/>
      <TopDrugs/>
      <Banner/>
    </div>
  )
}

export default Home