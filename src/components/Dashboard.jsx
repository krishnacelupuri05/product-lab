import React from 'react'

const Dashboard = ({ 
  recommendedJobs, 
  hasNurolePlus, 
  setCurrentPage, 
  viewJobDetails, 
  handleSubscription 
}) => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-title-h2 text-primary mb-2">Welcome to your Dashboard, Krishna!</h1>
        <p className="text-copy text-secondary mb-4">Complete your profile to get full access to Nurole features.</p>
        <button 
          onClick={() => setCurrentPage('my-profile')}
          className="text-cta text-cta hover:text-cta-hover"
        >
          View my profile
        </button>
      </div>

      {/* Recommended Roles Section */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-title-h3 text-primary mb-2">New recommended jobs</h2>
          <p className="text-copy text-secondary">These jobs perfectly match your live roles and your profile.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {recommendedJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer"
                 onClick={() => viewJobDetails(job.id)}>
              
              {/* Company Header */}
              <div className="p-4 border-b border-grey-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-grey-900 text-sm leading-tight line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                  <button className="p-1 hover:bg-white rounded-full transition-colors flex-shrink-0">
                    <span className="material-symbols-rounded text-grey-400 text-sm">favorite_border</span>
                  </button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-grey-600">
                    <span className="material-symbols-rounded mr-1 text-xs">business</span>
                    <span className="truncate">{job.company}</span>
                  </div>
                  <div className="flex items-center text-xs text-grey-600">
                    <span className="material-symbols-rounded mr-1 text-xs">location_on</span>
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-grey-600">
                    <span className="material-symbols-rounded mr-1 text-xs">payments</span>
                    <span className="truncate font-medium">{job.compensation}</span>
                  </div>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="p-4">
                <p className="text-xs text-grey-600 mb-3 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-grey-500 text-xs">+{job.skills.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-grey-500 mb-3">
                  <span>{job.deadline}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded">RECOMMENDED</span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    viewJobDetails(job.id);
                  }}
                  className="w-full button-primary text-xs py-2"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* See More Button */}
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('jobs')}
            className="button-secondary"
          >
            See more →
          </button>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-title-h3 text-primary">Upcoming events</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-secondary rounded-full border border-grey-300">
              <span className="material-symbols-rounded text-inactive">chevron_left</span>
            </button>
            <button className="p-2 hover:bg-secondary rounded-full border border-grey-300">
              <span className="material-symbols-rounded text-inactive">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {/* Event 1 */}
          <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="material-symbols-rounded text-6xl text-blue-600">target</span>
              </div>
              <button className="absolute top-3 right-3 p-1 hover:bg-white hover:bg-opacity-80 rounded-full">
                <span className="material-symbols-rounded text-inactive">favorite_border</span>
              </button>
              <div className="absolute top-3 left-3">
                <span className="bg-validation text-sage-700 px-2 py-1 rounded text-xs font-medium">
                  This Week
                </span>
              </div>
              {!hasNurolePlus && (
                <div className="absolute inset-0 bg-interaction bg-opacity-40 flex items-center justify-center">
                  <div className="bg-primary rounded-lg p-4 text-center">
                    <div className="material-symbols-rounded text-2xl mb-2">lock</div>
                    <p className="text-sm font-medium">Nurole Plus Required</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-copy-bold text-primary mb-1">Board Masterminds: Strategy Session</h3>
              <p className="text-sm text-inactive mb-3">Interactive workshop on strategic thinking for board directors</p>
              
              <div className="space-y-1 mb-4 text-sm text-inactive">
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">event</span>
                  March 15, 2024 • 2:00 PM GMT
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">group</span>
                  45 spots remaining
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">schedule</span>
                  2 hours
                </div>
              </div>
              
              {hasNurolePlus ? (
                <button className="button-primary w-full">
                  Register Now
                </button>
              ) : (
                <button 
                  onClick={handleSubscription}
                  className="button-primary w-full"
                >
                  Upgrade to Join
                </button>
              )}
            </div>
          </div>

          {/* Event 2 */}
          <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <span className="material-symbols-rounded text-6xl text-orange-600">handshake</span>
              </div>
              <button className="absolute top-3 right-3 p-1 hover:bg-white hover:bg-opacity-80 rounded-full">
                <span className="material-symbols-rounded text-inactive">favorite_border</span>
              </button>
              <div className="absolute top-3 left-3">
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                  Popular
                </span>
              </div>
              {!hasNurolePlus && (
                <div className="absolute inset-0 bg-interaction bg-opacity-40 flex items-center justify-center">
                  <div className="bg-primary rounded-lg p-4 text-center">
                    <div className="material-symbols-rounded text-2xl mb-2">lock</div>
                    <p className="text-sm font-medium">Nurole Plus Required</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-copy-bold text-primary mb-1">NED Networking Evening</h3>
              <p className="text-sm text-inactive mb-3">Connect with fellow non-executive directors in London</p>
              
              <div className="space-y-1 mb-4 text-sm text-inactive">
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">event</span>
                  March 20, 2024 • 6:00 PM GMT
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">location_on</span>
                  Central London
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">local_bar</span>
                  Drinks & Networking
                </div>
              </div>
              
              {hasNurolePlus ? (
                <button className="button-primary w-full">
                  Register Now
                </button>
              ) : (
                <button 
                  onClick={handleSubscription}
                  className="button-primary w-full"
                >
                  Upgrade to Join
                </button>
              )}
            </div>
          </div>

          {/* Event 3 */}
          <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                <span className="material-symbols-rounded text-6xl text-sage-600">analytics</span>
              </div>
              <button className="absolute top-3 right-3 p-1 hover:bg-white hover:bg-opacity-80 rounded-full">
                <span className="material-symbols-rounded text-inactive">favorite_border</span>
              </button>
              <div className="absolute top-3 left-3">
                <span className="bg-guidance text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  Webinar
                </span>
              </div>
              {!hasNurolePlus && (
                <div className="absolute inset-0 bg-interaction bg-opacity-40 flex items-center justify-center">
                  <div className="bg-primary rounded-lg p-4 text-center">
                    <div className="material-symbols-rounded text-2xl mb-2">lock</div>
                    <p className="text-sm font-medium">Nurole Plus Required</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-copy-bold text-primary mb-1">ESG Oversight Masterclass</h3>
              <p className="text-sm text-inactive mb-3">Deep dive into environmental, social, and governance oversight</p>
              
              <div className="space-y-1 mb-4 text-sm text-inactive">
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">event</span>
                  March 25, 2024 • 1:00 PM GMT
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">schedule</span>
                  90 minutes
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded mr-2 text-sm">computer</span>
                  Online Event
                </div>
              </div>
              
              {hasNurolePlus ? (
                <button className="button-primary w-full">
                  Register Now
                </button>
              ) : (
                <button 
                  onClick={handleSubscription}
                  className="button-primary w-full"
                >
                  Upgrade to Join
                </button>
              )}
            </div>
          </div>

          {/* View All Events Card */}
          <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-card border-2 border-dashed border-grey-300 flex items-center justify-center hover:border-sage-600 transition-colors cursor-pointer"
               onClick={() => setCurrentPage('nurole-plus')}>
            <div className="text-center p-8">
              <div className="material-symbols-rounded text-4xl mb-3 text-sage-600">event</div>
              <h3 className="text-copy-bold text-primary mb-2">View all events</h3>
              <p className="text-sm text-inactive">Explore more opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles posted by Plus Members Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-title-h3 text-primary mb-2">Roles posted by Plus Members</h2>
            <p className="text-copy text-secondary">Exclusive opportunities shared by our Nurole Plus community members</p>
          </div>
          <button 
            onClick={() => setCurrentPage('nurole-plus')}
            className="text-sage-600 text-sm hover:underline font-medium"
          >
            View all community roles →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Community Role 1 */}
          <div className="bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="p-4 border-b border-grey-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">PLUS MEMBER</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">NEW</span>
                </div>
                <button className="p-1 hover:bg-white rounded-full transition-colors">
                  <span className="material-symbols-rounded text-grey-400 text-sm">favorite_border</span>
                </button>
              </div>
              
              <h3 className="font-semibold text-grey-900 text-sm mb-2 line-clamp-2">
                Non-Executive Director - FinTech Scale-up
              </h3>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">business</span>
                  <span className="truncate">PayFlow Technologies</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">location_on</span>
                  <span className="truncate">London, UK</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">payments</span>
                  <span className="truncate font-medium">£40,000 + equity</span>
                </div>
              </div>
              
              <p className="text-xs text-grey-600 mb-3 line-clamp-2">
                Fast-growing payments company seeking experienced NED with fintech and regulatory expertise to join our board as we scale internationally.
              </p>
              
              <div className="flex items-center text-xs text-grey-500 mb-3">
                <span className="material-symbols-rounded mr-1 text-xs">person</span>
                <span>Posted by Sarah M., Managing Director</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">FinTech</span>
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Regulatory</span>
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Scale-up</span>
              </div>
              
              <button className="w-full button-primary text-xs py-2">
                View Details
              </button>
            </div>
          </div>

          {/* Community Role 2 */}
          <div className="bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="p-4 border-b border-grey-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">PLUS MEMBER</span>
                </div>
                <button className="p-1 hover:bg-white rounded-full transition-colors">
                  <span className="material-symbols-rounded text-grey-400 text-sm">favorite_border</span>
                </button>
              </div>
              
              <h3 className="font-semibold text-grey-900 text-sm mb-2 line-clamp-2">
                Chair of Audit Committee - Healthcare Trust
              </h3>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">business</span>
                  <span className="truncate">Northern Health Foundation</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">location_on</span>
                  <span className="truncate">Manchester, UK</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">payments</span>
                  <span className="truncate font-medium">£25,000 per annum</span>
                </div>
              </div>
              
              <p className="text-xs text-grey-600 mb-3 line-clamp-2">
                Leading healthcare foundation seeks experienced audit professional to chair our audit committee and oversee financial governance.
              </p>
              
              <div className="flex items-center text-xs text-grey-500 mb-3">
                <span className="material-symbols-rounded mr-1 text-xs">person</span>
                <span>Posted by James K., CEO</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Healthcare</span>
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Audit</span>
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Finance</span>
              </div>
              
              <button className="w-full button-primary text-xs py-2">
                View Details
              </button>
            </div>
          </div>

          {/* Community Role 3 */}
          <div className="bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden hover:shadow-card-hover transition-shadow">
            <div className="p-4 border-b border-grey-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">PLUS MEMBER</span>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">URGENT</span>
                </div>
                <button className="p-1 hover:bg-white rounded-full transition-colors">
                  <span className="material-symbols-rounded text-grey-400 text-sm">favorite_border</span>
                </button>
              </div>
              
              <h3 className="font-semibold text-grey-900 text-sm mb-2 line-clamp-2">
                Independent Director - Social Enterprise
              </h3>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">business</span>
                  <span className="truncate">Community Impact Ventures</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">location_on</span>
                  <span className="truncate">Birmingham, UK</span>
                </div>
                <div className="flex items-center text-xs text-grey-600">
                  <span className="material-symbols-rounded mr-1 text-xs">payments</span>
                  <span className="truncate font-medium">Pro bono</span>
                </div>
              </div>
              
              <p className="text-xs text-grey-600 mb-3 line-clamp-2">
                Social enterprise focused on community development seeks passionate director with experience in impact measurement and social innovation.
              </p>
              
              <div className="flex items-center text-xs text-grey-500 mb-3">
                <span className="material-symbols-rounded mr-1 text-xs">person</span>
                <span>Posted by Alex P., Founder</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Social Impact</span>
                <span className="bg-white text-grey-700 px-2 py-1 rounded text-xs border border-grey-200">Community</span>
              </div>
              
              <button className="w-full button-primary text-xs py-2">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Community Features Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="material-symbols-rounded text-purple-600 text-xl">group</span>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">Join the Community</h3>
              <p className="text-sm text-purple-700 mb-3">
                Nurole Plus members can post board vacancies from their organizations and networks, creating exclusive opportunities for the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {hasNurolePlus ? (
                  <button 
                    onClick={() => setCurrentPage('nurole-plus')}
                    className="button-primary text-sm"
                  >
                    Post a Role
                  </button>
                ) : (
                  <button 
                    onClick={handleSubscription}
                    className="button-primary text-sm"
                  >
                    Join Nurole Plus
                  </button>
                )}
                <button 
                  onClick={() => setCurrentPage('nurole-plus')}
                  className="button-secondary text-sm"
                >
                  View All Community Roles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
)

export default Dashboard 