import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Jobs from './components/Jobs'

const dummyJobs = [
  {
    id: 1,
    title: "Campaign Board Members",
    company: "Breast Cancer Now",
    companyType: "charity",
    description: "1 in 7 women in the UK will develop breast cancer during their lifetime, and approximately 11,500 women die annually from secondary breast cancer. Breast Cancer Now is a charity which is here to change the lives of those affected, by combining the power of research and support. It has invested nearly £300 million in research to date and continues to support the almost 900,000 people in the UK who are living with or beyond the disease.",
    location: "UK - London",
    deadline: "Midnight on 23rd July",
    compensation: "Pro bono",
    meetingsPerYear: "4 Board meetings per year",
    skills: ["Campaign Strategy", "Fundraising", "Public Relations"],
    recommended: true,
    category: "charity"
  },
  {
    id: 2,
    title: "Chair of the Audit Committee",
    company: "Lloyds Bank Corporate Markets plc",
    companyType: "financial",
    description: "Founded in 2017, Lloyds Bank Corporate Markets (LBCM) is a UK Financial & Capital Markets specialist, an international lender and a customer-centric Crown Dependencies bank, and is the sizeable non-ring-fenced subsidiary of Lloyds Banking Group (LBG). Core business areas include global financial markets, global capital markets, and lending.",
    location: "UK - London",
    deadline: "Midnight on 1st September",
    compensation: "£104,514 per annum plus £31,299 for Chair of Audit Committee",
    meetingsPerYear: "42-48 days per annum",
    skills: ["Financial Audit", "Risk Management", "Regulatory Compliance"],
    recommended: false,
    category: "financial"
  },
  {
    id: 3,
    title: "Non-Executive Director",
    company: "TechForward Ltd",
    companyType: "technology",
    description: "A rapidly growing fintech company specializing in digital banking solutions for SMEs. We're looking for an experienced NED to join our board and provide strategic guidance as we scale internationally.",
    location: "UK - Manchester",
    deadline: "Midnight on 15th August",
    compensation: "£45,000 per annum plus equity",
    meetingsPerYear: "6 Board meetings per year",
    skills: ["Technology Strategy", "Digital Transformation", "Fintech"],
    recommended: true,
    category: "technology"
  },
  {
    id: 4,
    title: "Chair of Remuneration Committee",
    company: "GreenEnergy Foundation",
    companyType: "charity",
    description: "Leading environmental charity focused on renewable energy initiatives across the UK. Seeking an experienced chair for our remuneration committee to oversee executive compensation strategy.",
    location: "UK - Edinburgh",
    deadline: "Midnight on 30th August",
    compensation: "Pro bono",
    meetingsPerYear: "8 Committee meetings per year",
    skills: ["Executive Compensation", "HR Strategy", "Environmental Policy"],
    recommended: false,
    category: "charity"
  },
  {
    id: 5,
    title: "Non-Executive Director",
    company: "University of Cambridge Press",
    companyType: "education",
    description: "One of the world's oldest publishing houses, seeking a NED with digital publishing experience to guide our transformation strategy in the digital age.",
    location: "UK - Cambridge",
    deadline: "Midnight on 20th September",
    compensation: "£35,000 per annum",
    meetingsPerYear: "4 Board meetings per year",
    skills: ["Publishing", "Digital Strategy", "Higher Education"],
    recommended: true,
    category: "education"
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard') // Set dashboard as default
  const [hasNurolePlus, setHasNurolePlus] = useState(false) // Track subscription status
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    charities: false,
    education: false,
    compensated: false
  })
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(true)
  const [selectedJobId, setSelectedJobId] = useState(null) // Track selected job for details view

  const toggleFilter = (filterName) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }

  // Function to handle subscription purchase
  const handleSubscription = () => {
    setHasNurolePlus(true)
    setCurrentPage('nurole-plus') // Redirect to community page after purchase
  }

  // Function to view job details
  const viewJobDetails = (jobId) => {
    setSelectedJobId(jobId)
    setCurrentPage('job-details')
  }

  // Function to go back from job details
  const goBackToJobs = () => {
    setSelectedJobId(null)
    setCurrentPage('jobs')
  }

  const filteredJobs = dummyJobs.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filters
    const matchesCharities = !selectedFilters.charities || job.category === 'charity'
    const matchesEducation = !selectedFilters.education || job.category === 'education'
    const matchesCompensated = !selectedFilters.compensated || job.compensation !== 'Pro bono'

    // Show only filters that are active
    const hasActiveFilters = selectedFilters.charities || selectedFilters.education || selectedFilters.compensated
    const matchesFilters = !hasActiveFilters || 
                          (selectedFilters.charities && job.category === 'charity') ||
                          (selectedFilters.education && job.category === 'education') ||
                          (selectedFilters.compensated && job.compensation !== 'Pro bono')

    return matchesSearch && matchesFilters
  })

  const recommendedJobs = filteredJobs.filter(job => job.recommended)
  const otherJobs = filteredJobs.filter(job => !job.recommended)

  const GetNurolePlusPage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Great Board Careers Start With a Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Trusted by over 65,000+ board directors and board-experienced professionals
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">65,000+</div>
              <div className="text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2,000+</div>
              <div className="text-gray-600">Roles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Organizations</div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Nurole Plus</h3>
            <div className="flex items-baseline justify-center mb-4">
              <span className="text-4xl font-bold text-gray-800">£600</span>
              <span className="text-gray-600 ml-2">/year</span>
            </div>
            <div className="text-green-600 font-medium mb-6">30-day free trial</div>
            <button 
              onClick={handleSubscription}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-4"
            >
              Begin a 30-day free trial
            </button>
            <p className="text-sm text-gray-500">Try it free for 30 days, then £600/year until cancelled</p>
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Roles Membership */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Roles membership</h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-800">£150</span>
                    <span className="text-gray-600 ml-1">/year</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Annual subscription</p>
                </div>
                
                <button 
                  onClick={handleSubscription}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6"
                >
                  Become a Roles member
                </button>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Access a curated list of board roles:</p>
                      <p className="text-sm text-gray-600">browse at least 30 live board roles curated for you weekly from across the web</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-white rounded text-sm text-gray-600">
                  (Note, these are 3rd party roles and NOT associated with Nurole. If you're interested in viewing roles managed by Nurole, you can apply to join Nurole for free <a href="#" className="text-blue-600 hover:underline">here</a>)
                </div>
              </div>

              {/* Nurole Plus Membership - Most Popular */}
              <div className="bg-white rounded-lg shadow-lg border-2 border-orange-400 p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Nurole Plus membership</h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-800">£600</span>
                    <span className="text-gray-600 ml-1">/year</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Annual subscription</p>
                </div>
                
                <button 
                  onClick={handleSubscription}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6"
                >
                  Begin a 30-day free trial
                </button>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Free 30-day trial:</p>
                      <p className="text-sm text-gray-600">all the benefits of membership at no cost for the first 30 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Access board roles:</p>
                      <p className="text-sm text-gray-600">browse 500+ board roles per year, curated for you weekly from across the web</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Exclusive event access:</p>
                      <p className="text-sm text-gray-600">at least four online events per month, all included in your membership</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Practical workshops:</p>
                      <p className="text-sm text-gray-600">participate in CV review webinars, elevator pitch sessions, and application support workshops to become a stand-out candidate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">1:1 expert guidance:</p>
                      <p className="text-sm text-gray-600">receive personalised support from our team of headhunters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Thriving NED community:</p>
                      <p className="text-sm text-gray-600">connect with members and expand your professional network</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Expert insights on demand:</p>
                      <p className="text-sm text-gray-600">tap into the community's collective wisdom by asking your most pressing questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Monthly board mastermind sessions:</p>
                      <p className="text-sm text-gray-600">collaborate with fellow NEDs and Chairs to tackle boardroom challenges and explore opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Comprehensive learning resources:</p>
                      <p className="text-sm text-gray-600">enjoy an ever-expanding library of videos and content</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Membership */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Premium membership</h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-800">£840</span>
                    <span className="text-gray-600 ml-1">/year</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Annual subscription</p>
                </div>
                
                <button 
                  onClick={handleSubscription}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6"
                >
                  Begin a 30-day free trial
                </button>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">1:1 Board CV review:</p>
                      <p className="text-sm text-gray-600">to develop or hone your important document (30min review, 15 min follow-up). Available after trial.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Free 30-day trial:</p>
                      <p className="text-sm text-gray-600">all the benefits of membership at no cost for the first 30 days.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-800">Full access to Nurole Plus:</p>
                      <p className="text-sm text-gray-600">all the benefits of Nurole Plus membership.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Features Table */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Features</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-600">Free</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-600">Pro for Individuals</th>
                    <th className="text-center py-4 px-6 font-medium text-green-600 bg-green-50">Pro for Teams</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Role Search</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Advanced Filters</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Priority Application Review</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Community Access</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Career Coaching</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-800">Team Management</td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="w-5 h-5 inline-block text-gray-300">○</span>
                    </td>
                    <td className="text-center py-4 px-6 bg-green-50">
                      <span className="w-5 h-5 inline-block text-green-500">✓</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Trusted by over 65,000 people and
          </h2>
          <h2 className="text-3xl font-bold text-center mb-12">
            500+ organizations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <p className="mb-4 italic">
                "I went from 20-30 hours a week spent on searching for board roles. With Nurole Plus I cut it down to just 2 hours where I can browse 100s of curated roles. It's an elegant team fit!"
              </p>
              <div className="font-medium">Sarah Mitchell</div>
              <div className="text-green-200">Board Director</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <p className="mb-4 italic">
                "Nurole Plus reduced the time our team spent on recruiting great board talent. Nurole Plus provides the efficiency and quality we were looking for."
              </p>
              <div className="font-medium">James Collins</div>
              <div className="text-green-200">Interim General Manager</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👔</span>
              </div>
              <p className="mb-4 italic">
                "Nurole's board co-ordination for screening boards at the mid-tier regional level. We experienced direct productivity increases."
              </p>
              <div className="font-medium">Anna Richardson</div>
              <div className="text-green-200">Business Operations Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-2">
                What will happen to my Premium subscription if I switch to Plus?
              </h3>
              <p className="text-gray-600">
                Your Premium subscription will be automatically upgraded to Plus, and you'll get access to all additional features immediately.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-2">
                How do you set Nurole Plus?
              </h3>
              <p className="text-gray-600">
                Nurole Plus is our premium tier that includes advanced features like priority application review, community access, and career coaching.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-2">
                What form of payment do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Do you offer discounts for educational institutions?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special rates for educational institutions and non-profit organizations. Contact our sales team for more details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Move Your Board Career Forward?
          </h2>
          <button 
            onClick={handleSubscription}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Get Nurole Plus
          </button>
          <p className="mt-4 text-gray-600">
            <a href="#" className="text-green-600 hover:underline">Looking for Nurole Premium instead?</a>
          </p>
        </div>
      </div>
    </div>
  )

  const NurolePlusPage = () => (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Interested in Nurole Plus?</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-white">
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">📅</span>
                <span className="text-sm">Upcoming Events</span>
              </div>
              <span className="text-xs bg-grey-200 px-2 py-1 rounded">21</span>
            </div>
            
            <div className="flex items-center p-2 rounded bg-blue-600 text-white">
              <span className="mr-2">✉️</span>
              <span className="text-sm font-medium">Letter from our CEO</span>
            </div>
            
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-red-500 mr-2">🔥</span>
              <span className="text-sm">Community Features</span>
            </div>
            
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-green-500 mr-2">✅</span>
              <span className="text-sm">Join Now</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Programmes</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-gray-600 mr-2">👥</span>
              <span className="text-sm">Chair programme</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-green-500 mr-2">🌱</span>
              <span className="text-sm">Board Pathway programme</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Welcome</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-purple-500 mr-2">🎉</span>
              <span className="text-sm">You're in - welcome to N...</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-gray-600 mr-2">📚</span>
              <span className="text-sm">Start here - onboarding</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-blue-500 mr-2">🤝</span>
              <span className="text-sm">Community Concierge</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Community</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded hover:bg-white">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">💡</span>
                <span className="text-sm">Ask the Community</span>
              </div>
              <span className="text-xs bg-grey-200 px-2 py-1 rounded">1</span>
            </div>
            <div className="flex items-center p-2 rounded bg-blue-600 text-white">
              <span className="mr-2">✉️</span>
              <span className="text-sm font-medium">Letter from our CEO</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-red-500 mr-2">🔥</span>
              <span className="text-sm">Community Features</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-green-500 mr-2">✅</span>
              <span className="text-sm">Join Now</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Events</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-red-500 mr-2">📅</span>
              <span className="text-sm">Overview of events</span>
            </div>
            <div className="flex items-center p-2 rounded hover:bg-white">
              <span className="text-purple-500 mr-2">🎯</span>
              <span className="text-sm">Board Masterminds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="text-lg font-bold tracking-wider mr-4">NUROLE+</span>
                <div className="w-1 h-16 bg-yellow-400 mr-6"></div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Letter from</h1>
                  <h1 className="text-4xl font-bold">our <span className="italic text-yellow-300">CEO</span></h1>
                  <p className="text-xl mt-2 font-light tracking-wide">OLIVER CUMMINGS</p>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400">
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-3xl">👨‍💼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to the Nurole+</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-white rounded">📖</button>
              <button className="p-1 hover:bg-white rounded">⋯</button>
              <button className="p-1 hover:bg-white rounded">🔗</button>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-sm">👨‍💼</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">Oliver Cummings</span>
                <span className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">Admin</span>
                <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">Nurole Team</span>
              </div>
              <div className="text-sm text-gray-500">
                Member since April 2023 • May 11, 2023
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Every day, I speak to board members who tell me how hard it can be to find the right support as they navigate the non-executive landscape. Whether it's finding their next meaningful role or addressing the increasingly complex issues facing their boards, many describe the experience as both rewarding and isolating.
            </p>

            <p className="text-gray-700 mb-4">
              While executive leaders often have access to thriving networks and development forums, non-executives are frequently left without a space to reflect, learn, and connect with peers. That's why we created <strong>Nurole Plus</strong> — a place for our most engaged members to come together, learn from one another, and get more from their board careers.
            </p>

            <p className="text-gray-700 mb-4">
              Since launch, we've seen members unlock new roles, build valuable relationships with fellow board members, and gain the confidence to step up — whether that's chairing boards, developing a portfolio career, or taking on more complex and senior roles.
            </p>

            <p className="text-gray-700 mb-4">
              With 65,000 members, Nurole is uniquely placed at the heart of the board space and we take that responsibility seriously - not just by matching individuals to roles, but by supporting them at every stage of their non-executive journey.
            </p>

            <p className="text-gray-700 mb-6">
              <strong>Want to learn more?</strong><br />
              Read more on our <strong>Community Features page</strong> about how <strong>Nurole Plus</strong> can help you:
            </p>

            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Increase your chances of getting your next board role</li>
              <li>Become a better member of the boards you sit on</li>
            </ul>

            <p className="text-gray-700 mb-4">
              <strong>Ready to sign up?</strong><br />
              If you're interested, you can start by joining <strong>Nurole Plus HERE</strong>. We currently offer an initial <strong>free trial period</strong>.
            </p>

            <p className="text-gray-700">
              <strong>Already a member?</strong><br />
              Welcome back! <a href="#" className="text-blue-600 hover:underline">Access member-only spaces</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const JobCard = ({ job, isRecommended = false }) => (
    <div className="bg-primary rounded-lg shadow-card border border-primary p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center mr-4">
              <span className="text-invert font-bold text-lg">
                {job.company.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
              <p className="text-secondary">{job.company}</p>
            </div>
          </div>
        </div>
        {isRecommended && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
            RECOMMENDED
          </span>
        )}
      </div>

      <p className="text-secondary mb-4 line-clamp-3">{job.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-inactive">
          <span className="material-symbols-rounded text-sage-500 mr-2 text-sm">location_on</span>
          {job.location}
        </div>
        <div className="flex items-center text-sm text-inactive">
          <span className="material-symbols-rounded text-blue-500 mr-2 text-sm">schedule</span>
          {job.deadline}
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-primary flex items-center">
              <span className="material-symbols-rounded mr-2 text-sm">payments</span>
              {job.compensation}
            </span>
          </div>
          <div>
            <span className="font-medium text-primary flex items-center">
              <span className="material-symbols-rounded mr-2 text-sm">event</span>
              {job.meetingsPerYear}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span key={index} className="bg-secondary text-secondary px-2 py-1 rounded text-xs">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => viewJobDetails(job.id)}
          className="button-primary">
          View details
        </button>
        <button className="button-secondary">
          Quick Apply
        </button>
        <button className="button-secondary">
          Recommend
        </button>
      </div>

      {!isRecommended && (
        <div className="flex items-center mt-4 pt-4 border-t">
          <div className="w-4 h-4 border border-grey-300 rounded-full mr-3"></div>
          <span className="text-sm text-inactive">Not interested in this role?</span>
          <button className="text-cta text-sm ml-auto hover:underline">
            UPDATE PRO BONO PREFERENCES
          </button>
        </div>
      )}
    </div>
  )

  const JobsPage = () => (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-input w-full"
            />
            <span className="absolute right-3 top-3 material-symbols-rounded text-inactive">search</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-inactive">Sort by</span>
            <select className="select-input">
              <option>Relevant to you</option>
              <option>Newest first</option>
              <option>Deadline</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-inactive">Filter by</span>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFilter('charities')}
                className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  selectedFilters.charities 
                    ? 'bg-sage-600 text-invert' 
                    : 'bg-secondary text-secondary'
                }`}
              >
                <span className="material-symbols-rounded mr-1 text-sm">
                  {selectedFilters.charities ? 'check' : 'add'}
                </span> 
                Charities (3)
              </button>
              <button
                onClick={() => toggleFilter('education')}
                className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  selectedFilters.education 
                    ? 'bg-sage-600 text-invert' 
                    : 'bg-secondary text-secondary'
                }`}
              >
                <span className="material-symbols-rounded mr-1 text-sm">
                  {selectedFilters.education ? 'check' : 'add'}
                </span> 
                Education (1)
              </button>
              <button
                onClick={() => toggleFilter('compensated')}
                className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  selectedFilters.compensated 
                    ? 'bg-sage-600 text-invert' 
                    : 'bg-secondary text-secondary'
                }`}
              >
                <span className="material-symbols-rounded mr-1 text-sm">
                  {selectedFilters.compensated ? 'check' : 'add'}
                </span> 
                Compensated (3)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {recommendedJobs.length > 0 && (
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-title-h3 text-primary mb-2">Recommended for you</h2>
            <p className="text-secondary">
              Based on your <span className="font-medium">PREFERENCES</span> and{' '}
              <span className="font-medium">PROFESSIONAL EXPERIENCE</span>, we think the following roles will be interesting and appropriate for you.
            </p>
          </div>

          {recommendedJobs.map(job => (
            <JobCard key={job.id} job={job} isRecommended={true} />
          ))}

          <div className="bg-sage-700 text-invert rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-2xl mr-2">assignment_turned_in</span>
              <h3 className="text-lg font-semibold">You have reached the end of your recommended roles</h3>
            </div>
            <p className="mb-4 opacity-90">
              We make recommendations based on your preferences and personal experience. The more information we have, the better our suggestions. To ensure you see all the most relevant roles, please update your information below. Otherwise, keep scrolling to see more open roles.
            </p>
          <div className="space-x-4">
              <button className="button-primary-light">
                Update Profile
              </button>
              <button className="button-secondary-dark">
                Update Preferences
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Other Roles Section */}
      {otherJobs.length > 0 && (
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-title-h3 text-primary mb-2">Other roles</h2>
            <p className="text-secondary">
              We don't see a strong correlation between these positions and your current experience and preferences, but please feel free to take a look.
            </p>
          </div>

          {otherJobs.map(job => (
            <JobCard key={job.id} job={job} isRecommended={false} />
          ))}
        </section>
      )}

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary text-lg">No roles found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedFilters({ charities: false, education: false, compensated: false })
            }}
            className="mt-4 text-cta hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Events Preview Section - Moved to Bottom */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-guidance to-sage-50 rounded-lg p-8 border border-guidance">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title-h3 text-primary mb-2">Upcoming Events</h2>
              <p className="text-secondary">Exclusive networking and learning opportunities for board professionals</p>
            </div>
            <div className="hidden md:block">
              <span className="bg-sage-100 text-sage-600 px-3 py-1 rounded-full text-sm font-medium">
                21 Events This Month
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Event Card 1 */}
            <div className="bg-primary rounded-lg shadow-card border border-primary p-6 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-validation text-sage-700 px-2 py-1 rounded text-xs font-medium">
                  This Week
                </span>
              </div>
              <div className="mb-4">
                <span className="material-symbols-rounded text-4xl mb-2 block text-blue-600">target</span>
                <h3 className="font-semibold text-primary mb-2">Board Masterminds: Strategy Session</h3>
                <p className="text-sm text-inactive mb-3">Interactive workshop on strategic thinking for board directors</p>
                <div className="text-sm text-inactive">
                  <div className="flex items-center mb-1">
                    <span className="material-symbols-rounded mr-2 text-sm">event</span>
                    <span>March 15, 2024 • 2:00 PM GMT</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-rounded mr-2 text-sm">group</span>
                    <span>45 spots remaining</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {hasNurolePlus ? (
                  <button className="button-primary w-full">
                    <span className="material-symbols-rounded mr-2">event_available</span>
                    Register Now
                  </button>
                ) : (
                  <button 
                    onClick={handleSubscription}
                    className="button-primary w-full"
                  >
                    <span className="material-symbols-rounded mr-2">lock</span>
                    Upgrade to Access
                  </button>
                )}
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-primary rounded-lg shadow-card border border-primary p-6 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                  Popular
                </span>
              </div>
              <div className="mb-4">
                <span className="material-symbols-rounded text-4xl mb-2 block text-orange-600">handshake</span>
                <h3 className="font-semibold text-primary mb-2">NED Networking Evening</h3>
                <p className="text-sm text-inactive mb-3">Connect with fellow non-executive directors in London</p>
                <div className="text-sm text-inactive">
                  <div className="flex items-center mb-1">
                    <span className="material-symbols-rounded mr-2 text-sm">event</span>
                    <span>March 20, 2024 • 6:00 PM GMT</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-rounded mr-2 text-sm">location_on</span>
                    <span>Central London</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {hasNurolePlus ? (
                  <button className="button-primary w-full">
                    <span className="material-symbols-rounded mr-2">event_available</span>
                    Register Now
                  </button>
                ) : (
                  <button 
                    onClick={handleSubscription}
                    className="button-primary w-full"
                  >
                    <span className="material-symbols-rounded mr-2">lock</span>
                    Upgrade to Access
                  </button>
                )}
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-primary rounded-lg shadow-card border border-primary p-6 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-guidance text-guidance px-2 py-1 rounded text-xs font-medium">
                  Webinar
                </span>
              </div>
              <div className="mb-4">
                <span className="material-symbols-rounded text-4xl mb-2 block text-sage-600">analytics</span>
                <h3 className="font-semibold text-primary mb-2">ESG Oversight Masterclass</h3>
                <p className="text-sm text-inactive mb-3">Deep dive into environmental, social, and governance oversight</p>
                <div className="text-sm text-inactive">
                  <div className="flex items-center mb-1">
                    <span className="material-symbols-rounded mr-2 text-sm">event</span>
                    <span>March 25, 2024 • 1:00 PM GMT</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-rounded mr-2 text-sm">schedule</span>
                    <span>90 minutes</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {hasNurolePlus ? (
                  <button className="button-primary w-full">
                    <span className="material-symbols-rounded mr-2">event_available</span>
                    Register Now
                  </button>
                ) : (
                  <button 
                    onClick={handleSubscription}
                    className="button-primary w-full"
                  >
                    <span className="material-symbols-rounded mr-2">lock</span>
                    Upgrade to Access
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Upsell CTA */}
          {hasNurolePlus ? (
            <div className="bg-primary rounded-lg border-2 border-validation p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-3xl mr-3 text-sage-600">check_circle</span>
                <div>
                  <h3 className="text-xl font-bold text-primary">Welcome to Nurole Plus!</h3>
                  <p className="text-secondary">You now have access to all exclusive events and premium features</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>Full event access</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>Priority support</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>VIP networking</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>Expert sessions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => setCurrentPage('nurole-plus')}
                  className="button-primary"
                >
                  Visit Community
                </button>
                <button className="button-secondary">
                  Manage Subscription
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-primary rounded-lg border-2 border-validation p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-3xl mr-3 text-orange-600">celebration</span>
                <div>
                  <h3 className="text-xl font-bold text-primary">Unlock All Events with Nurole Plus</h3>
                  <p className="text-secondary">Join 65,000+ board professionals accessing exclusive events and networking</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>21+ events monthly</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>Exclusive masterclasses</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>VIP networking access</span>
                </div>
                <div className="flex items-center text-sm text-inactive">
                  <span className="material-symbols-rounded text-sage-600 mr-2 text-sm">check</span>
                  <span>Industry expert sessions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleSubscription}
                  className="button-primary"
                >
                  Start Free Trial
                </button>
                <button 
                  onClick={() => setCurrentPage('nurole-plus')}
                  className="button-secondary"
                >
                  Learn More
                </button>
              </div>
              
              <p className="text-sm text-inactive mt-3">
                <span className="material-symbols-rounded mr-1 text-sm">bolt</span>
                Limited time: 30% off first year for new members
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )

  const MyProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [profileSubSection, setProfileSubSection] = useState('summary')

    return (
      <div className="min-h-screen bg-white">
        {/* Profile Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Profile
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'preferences'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Preferences
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'watchlist'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Watchlist
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Recommendations
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Profile Navigation */}
            {activeTab === 'profile' && (
              <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit">
                <div className="space-y-2">
                  <button
                    onClick={() => setProfileSubSection('summary')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'summary'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'summary' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Summary</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('experience')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'experience'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'experience' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Professional experience</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('highlights')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'highlights'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'highlights' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Career highlights</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('education')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'education'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'education' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Education</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('cvs')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'cvs'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'cvs' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">CVs</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('qualifications')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'qualifications'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'qualifications' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Qualifications (optional)</span>
                  </button>
                  
                  <button
                    onClick={() => setProfileSubSection('additional')}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      profileSubSection === 'additional'
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">
                      {profileSubSection === 'additional' ? '✓' : '○'}
                    </span>
                    <span className="text-sm font-medium">Additional information (optional)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  {/* Profile Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                      KC
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">Krishna Celupuri</h1>
                      <p className="text-gray-600 mb-1">United Kingdom</p>
                      <p className="text-gray-600 mb-3">1234567890045</p>
                      <div className="flex items-center text-blue-600 mb-4">
                        <span className="mr-2">🔗</span>
                        <span className="text-sm">krishnacelupuri</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                          ✏️ Edit details
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                          👁️ Preview my Profile
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                          📤 Share my profile
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Visibility */}
                  <div className="mb-8 p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Profile visibility</h3>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Your profile is public</p>
                          <p>Anyone with the link can view your Nurole profile</p>
                        </div>
                      </div>
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        MANAGE VISIBILITY ↓
                      </button>
                    </div>
                  </div>

                  {/* Career Summary Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Career summary</h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">EXAMPLE 1/3</span>
                        <button className="p-1 hover:bg-white rounded">←</button>
                        <button className="p-1 hover:bg-white rounded">→</button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Example Summary */}
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-gray-700 mb-4">
                          Alex served as a C-suite executive in three Fortune 500 companies in the Tech and Consumer sectors. With a footprint in the US and Europe, his leadership led to two successful IPOs and a 40% CAGR over five years. Awards include Fortune's Top 40 Under 40.
                        </p>
                      </div>

                      {/* Detailed Career Points */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Alex served as a C-suite executive in three Fortune 500 companies in the Tech and Consumer sectors. With a footprint in the US and Europe, his leadership led to two successful IPOs and a 40% CAGR over five years. Awards include Fortune's Top 40 Under 40.
                            </p>
                            <p className="text-gray-700">
                              Alex served as a C-suite executive in three Fortune 500 companies in the Tech and Consumer sectors. With a footprint in the US and Europe, his leadership led to two successful IPOs and a 40% CAGR over five years. Awards include Fortune's Top 40 Under 40.
                            </p>
                            <p className="text-gray-500 text-sm">
                              + 5 more lines
                            </p>
                          </div>
                          <div className="mt-4 text-sm text-gray-500">
                            We recommend keeping responses to c.75 words: <span className="text-orange-500">93/75</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                            <span className="text-blue-500 mr-2">ℹ️</span>
                            WHAT TO INCLUDE
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Senior roles: e.g. Chair, C-suite</li>
                            <li>• Company type: e.g. Public, Private Equity, Non-Profit</li>
                            <li>• Sectors: e.g. Financial Services, Consumer Goods</li>
                            <li>• Geographies: e.g. domestic, international, specific regions</li>
                            <li>• Key milestones: Significant career events, awards, or other achievements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder content */}
              {activeTab === 'preferences' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">My Preferences</h2>
                  <p className="text-gray-600">Configure your role preferences and search criteria here.</p>
                </div>
              )}

              {activeTab === 'watchlist' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Watchlist</h2>
                  <p className="text-gray-600">Keep track of roles you're interested in.</p>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Applications</h2>
                  <p className="text-gray-600">Track your job applications and their status.</p>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h2>
                  <p className="text-gray-600">View and manage your professional recommendations.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
                  <p className="text-gray-600">Manage your account settings and preferences.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RoleDetailsPage = () => {
    const job = dummyJobs.find(j => j.id === selectedJobId)
    
    if (!job) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Role not found</h2>
            <button 
              onClick={goBackToJobs}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
            >
              Back to Roles
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={goBackToJobs}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← BACK
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                {/* Role Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
                    <h2 className="text-xl text-gray-600 mb-4">{job.company}</h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-medium">
                        PRO BONO
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <span className="mr-2">🏢</span>
                        <span>4 Board meetings per year</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>Deadline: {job.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-6">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded text-sm">
                      BREAST CANCER NOW
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-8">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Quick Apply
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    + Add to watchlist
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    📤 Share
                  </button>
                </div>

                {/* Role Details Tabs */}
                <div className="mb-6">
                  <div className="flex space-x-8 border-b border-gray-200">
                    <button className="pb-2 text-green-600 border-b-2 border-green-600 font-medium">
                      🏢 ROLE DETAILS
                    </button>
                    <button className="pb-2 text-gray-500 hover:text-gray-700">
                      🔍 RECOMMENDED CANDIDATES
                    </button>
                  </div>
                </div>

                {/* About Section */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">About {job.company}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {job.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As the charity that brings together world-class research with life-changing care, we're working to stop women dying from breast cancer by 2050. With a footprint in the UK and Europe, our leadership led to two successful fundraising campaigns and a 40% increase in research funding over five years.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Breast Cancer Now is focused on the integrated strategy to place the voice of people with breast cancer at the centre of our work.
                  </p>
                </section>

                {/* The Campaign Section */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">The Campaign</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We believe the campaign is launching an ambitious new campaign in Autumn 2024, which will raise even more by 2030. The campaign will build research funding and awareness supporting the overall vision, while looking through a global evidence base to drive better progress.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A campaign bringing primary breast cancer treatment will drive access to the information they need to help reduce future research gaps, drive evidence, increase treatment investments.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    As part of our approach to become the UK's largest academic funder of breast cancer research and a catalyst for global research, Breast Cancer Now needs to continue change. By utilising and more £100m over the next five years, along business set event.
                  </p>
                </section>

                {/* Role Specification */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Role specification</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Campaign Board is led by Breast Cancer Now's appointed CEO Delyth and Chair of Ethics & Sponsor and UK Government Organisations Advisory Board's appointed by the Board of Trustees. It will comprise the Chair of Breast Cancer Now, a nominated Board Trustee, and a senior group including an active Breast Cancer Now campaign and board-led directors.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Key responsibilities include:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Working closely with the charity's leadership and philanthropic experts, with nearly 15 years of experience</li>
                        <li>You will be instrumental to the charity's Breast Cancer Now campaigns, including and delivering strong membership and communications training with philanthropic fundraising by brand members in a professional and timely manner</li>
                        <li>They will have accountability experience and experience the fundraising techniques at meetings Breast Cancer Now</li>
                        <li>You will have the right experience to lead members' help with the charity's helpline centres, their people affected by breast cancer, budget fit timely, Client fit and advice helpline work experience for organisations bringing staff to the audit as well as access to their delivering work funded by the Campaign</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Person Specification */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Person specification</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At this point in the campaign journey, we are looking for driven and ambitious Campaign Board Members who are further supported to focus a role of voluntary breast cancer. Breast Cancer is working alongside Campaign Board Members, under the leadership of Robyn Campbell CBE, one by some have a variety of backgrounds but will be looking for others who may have experience an exciting, challenging, experience or achieving, value assumptions by the team, their group don't hesitate to get in touch too for "Questions & feedback" box below or directly via campaigns@breastcancernow.org.
                  </p>
                </section>

                {/* Terms of Appointment */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Terms of appointment</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The role is unpaid and the Campaign Board will meet quarterly, so each half of which will be in-person beyond these. There will be ad-hoc engagement and the potential for focused working group meetings. The appointment is on a initial three year term.
                  </p>
                </section>

                {/* Process */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This role is advertised equal opportunities with the team. Potential down Tuesday to get a detail via the "<a href="#" className="text-blue-600 hover:underline">Questions & feedback</a>" box below or directly via campaigns@breastcancernow.org and we are delighted to hear from you.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Interested parties</strong><br />
                    If you would like to find out more about the role before official follow directly, contact it you know someone in our Breast Cancer Now Application, board members if in our Request for Applications should members should via out contact this may ask having their own direct message.
                  </p>
                </section>

                {/* Questions & Feedback */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Questions & feedback</h3>
                  <p className="text-gray-700 mb-4">
                    Please reach out regarding any queries you may have about this role. We'll get back to you via email within two working days.
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-gray-600">👤</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Josh Dernie</div>
                      <div className="text-sm text-gray-600">Operations Manager</div>
                    </div>
                  </div>
                </section>

                {/* Submit Questions Button */}
                <div className="mb-8">
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors">
                    Submit questions
                  </button>
                </div>

                {/* Role Timetable */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Role timetable</h3>
                  <div className="space-y-2 text-gray-700">
                    <div><strong>Deadline for applications:</strong> Midnight on 23rd July</div>
                    <div><strong>Candidate on expect to be contacted by:</strong> 1st August</div>
                  </div>
                </section>

                {/* Final Action Buttons */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Quick Apply
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    Recommend someone
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    + Add to watchlist
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="font-semibold text-gray-800 mb-4">Role Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Organization Type</div>
                    <div className="font-medium text-gray-800 capitalize">{job.companyType}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="font-medium text-gray-800">{job.location}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Compensation</div>
                    <div className="font-medium text-gray-800">{job.compensation}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Time Commitment</div>
                    <div className="font-medium text-gray-800">{job.meetingsPerYear}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Application Deadline</div>
                    <div className="font-medium text-gray-800">{job.deadline}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Key Skills</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-white text-gray-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                      Apply Now
                    </button>
                    <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded transition-colors">
                      Save Role
                    </button>
                    <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded transition-colors">
                      Share Role
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Similar Roles</h4>
                  <div className="space-y-3">
                    {dummyJobs.filter(j => j.id !== job.id && j.category === job.category).slice(0, 2).map(similarJob => (
                      <div key={similarJob.id} className="border border-gray-200 rounded p-3 hover:bg-white cursor-pointer transition-colors"
                           onClick={() => viewJobDetails(similarJob.id)}>
                        <div className="font-medium text-gray-800 text-sm mb-1">{similarJob.title}</div>
                        <div className="text-gray-600 text-xs">{similarJob.company}</div>
                        <div className="text-gray-500 text-xs mt-1">{similarJob.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-sage-700 text-invert">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center flex-1">
              <h1 className="text-xl font-bold tracking-wider mr-8">NUROLE</h1>
              <nav className="flex space-x-6 text-sm">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`pb-1 ${currentPage === 'dashboard' ? 'border-b-2 border-highlight' : 'hover:text-grey-200'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentPage('jobs')}
                  className={`pb-1 ${currentPage === 'jobs' ? 'border-b-2 border-highlight' : 'hover:text-grey-200'}`}
                >
                  View roles
                </button>
                <button 
                  onClick={() => setCurrentPage('my-profile')}
                  className={`pb-1 ${currentPage === 'my-profile' ? 'border-b-2 border-highlight' : 'hover:text-grey-200'}`}
                >
                  My Profile
                </button>
                {hasNurolePlus ? (
                  <button 
                    onClick={() => setCurrentPage('nurole-plus')}
                    className={`pb-1 ${currentPage === 'nurole-plus' ? 'border-b-2 border-highlight' : 'hover:text-grey-200'}`}
                  >
                    My Nurole Plus <span className="bg-sage-600 text-invert px-1 rounded text-xs ml-1">✓</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setCurrentPage('get-nurole-plus')}
                    className={`pb-1 ${currentPage === 'get-nurole-plus' ? 'border-b-2 border-highlight' : 'hover:text-grey-200'}`}
                  >
                    Explore Nurole Plus
                  </button>
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="button-primary-light">
                Post a role
              </button>
              
              {/* Toggle for testing subscription states */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-grey-300">
                  {hasNurolePlus ? 'Plus Member' : 'Free User'}
                </span>
                <button
                  onClick={() => setHasNurolePlus(!hasNurolePlus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    hasNurolePlus ? 'bg-sage-600' : 'bg-grey-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                      hasNurolePlus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="w-8 h-8 bg-grey-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentPage === 'dashboard' && 
        <Dashboard 
          recommendedJobs={recommendedJobs}
          hasNurolePlus={hasNurolePlus}
          setCurrentPage={setCurrentPage}
          viewJobDetails={viewJobDetails}
          handleSubscription={handleSubscription}
        />
      }
      {currentPage === 'jobs' && 
        <Jobs 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          recommendedJobs={recommendedJobs}
          otherJobs={otherJobs}
          hasNurolePlus={hasNurolePlus}
          handleSubscription={handleSubscription}
          setCurrentPage={setCurrentPage}
          viewJobDetails={viewJobDetails}
        />
      }
      {currentPage === 'nurole-plus' && <NurolePlusPage />}
      {currentPage === 'get-nurole-plus' && <GetNurolePlusPage />}
      {currentPage === 'my-profile' && <MyProfilePage />}
      {currentPage === 'job-details' && <RoleDetailsPage />}
    </div>
  )
}

export default App 