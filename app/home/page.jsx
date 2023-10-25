import HeaderPublic from '../components/headerPublic/headerPublic'
import Footer from '../components/footer/Footer'
import SubscriptionsSection from './subscriptions/section'
import BannerSection from './banner/Section'
import AboutSection from './about/Section'
import AboutUsSection from './AboutUs/Section'
import Box from '@mui/material/Box';

export default function HomePage() { 
  return (
  <> 
    <HeaderPublic/>
    <Box component="main" sx={{ pt: 13 }}>
      <BannerSection/>
      <AboutUsSection/>
      <AboutSection/>    
      <SubscriptionsSection />
    </Box>
    <Footer/> 
    
  </>
  )
}