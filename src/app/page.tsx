import Hero from '@/components/hero';
import HowItWorks from '@/components/HowItWorks'
import TrustedBy from '@/components/TrustedBy'
import CtaBanner from '@/components/CtaBanner';

const page = () => {
  return (
    <div>
        <Hero/>
        <HowItWorks/>
        <TrustedBy/>
        <CtaBanner/>
    </div>
  )
}

export default page