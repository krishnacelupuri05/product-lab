import React from 'react'

const JobCard = ({ job, isRecommended = false, viewJobDetails }) => (
  <div className="bg-white rounded-lg shadow-card border border-grey-200 overflow-hidden mb-6 hover:shadow-card-hover transition-shadow">
    {/* Organization Header Section */}
    <div className="bg-grey-50 px-6 py-4 border-b border-grey-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="w-16 h-16 bg-white rounded-lg border border-grey-200 flex items-center justify-center shadow-sm">
            <div className="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {job.company.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Company Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-grey-900 mb-1">{job.company}</h3>
            <div className="flex items-center space-x-4 text-sm text-grey-600">
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-1 text-sm">location_on</span>
                {job.location}
              </div>
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-1 text-sm">schedule</span>
                {job.deadline}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-grey-100 rounded-full transition-colors">
            <span className="material-symbols-rounded text-grey-500">favorite_border</span>
          </button>
          {isRecommended && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
              RECOMMENDED
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Role Content Section */}
    <div className="px-6 py-4">
      {/* Role Title */}
      <h2 className="text-xl font-bold text-grey-900 mb-2">{job.title}</h2>
      
      {/* Role Description */}
      <p className="text-grey-700 mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

      {/* Compensation and Meeting Info */}
      <div className="flex items-center space-x-6 mb-4 text-sm">
        <div className="flex items-center">
          <span className="material-symbols-rounded mr-2 text-sm text-grey-600">payments</span>
          <span className="font-medium text-grey-900">{job.compensation}</span>
        </div>
        <div className="flex items-center">
          <span className="material-symbols-rounded mr-2 text-sm text-grey-600">event</span>
          <span className="font-medium text-grey-900">{job.meetingsPerYear}</span>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span key={index} className="bg-grey-100 text-grey-700 px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
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

      {/* Not Interested Section */}
      {!isRecommended && (
        <div className="flex items-center mt-4 pt-4 border-t border-grey-200">
          <div className="w-4 h-4 border border-grey-300 rounded-full mr-3 flex items-center justify-center">
            <span className="material-symbols-rounded text-xs text-grey-400">info</span>
          </div>
          <span className="text-sm text-grey-600">Not interested in this role?</span>
          <button className="text-sage-600 text-sm ml-auto hover:underline font-medium">
            UPDATE PRO BONO PREFERENCES
          </button>
        </div>
      )}
    </div>
  </div>
)

const Jobs = ({ 
  searchTerm,
  setSearchTerm,
  selectedFilters,
  toggleFilter,
  recommendedJobs,
  otherJobs,
  hasNurolePlus,
  handleSubscription,
  setCurrentPage,
  viewJobDetails
}) => (
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
          <JobCard key={job.id} job={job} isRecommended={true} viewJobDetails={viewJobDetails} />
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
          <JobCard key={job.id} job={job} isRecommended={false} viewJobDetails={viewJobDetails} />
        ))}
      </section>
    )}

    {/* External Board Roles Section */}
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-title-h3 text-primary mb-4">External Board Roles</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-grey-700 mb-3">
            We want to give you as much visibility of the board market as possible.
          </p>
          <p className="text-sm text-grey-700 mb-3">
            If you know of a board vacancy in your organisation / network which might be interesting for other members, please post it in the "roles from the community" area of Nurole Plus. Together, let's support each other to succeed.
          </p>
          <p className="text-sm text-grey-700 mb-3">
            If you apply for a role listed here please let us know at <a href="mailto:community@nurole.com" className="text-blue-600 hover:underline">community@nurole.com</a> if you can - that data helps us focus on the right areas when collecting external roles.
          </p>
          <p className="text-sm text-grey-700 mb-3">
            Roles marked <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">(NEW)</span> were found and added this week, but the deadline set by the hiring organisation may be quite soon, depending on how quickly the role was identified.
          </p>
          <p className="text-sm text-grey-700">
            Finally, don't forget to log into Nurole.com to explore the roles available there. You might not always get alerted to roles that might be of interest to you so do take a look back there when you can.
          </p>
        </div>
      </div>

      {/* Public Sector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 pb-2 border-b border-grey-200">Public Sector</h3>
        <div className="space-y-3">
          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Babergh and Mid Suffolk District Council, Non-Executive Directors</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Asset, risk and leadership skills in a relevant property investment or fund management industry.]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (27 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Croydon Council, Chair of the Housing Assurance Board</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[RP or local authority background, and a strong understanding of current housing regulation.]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (29 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">The Government Internal Audit Agency, Non-Executive Director</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (31 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Government Internal Audit Agency, Non Executive Director</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Experience in supporting organisations to transform, particularly where this involved digital or artificial intelligence tools]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (31 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Welsh Industrial Development Advisory Board, Members (5 roles)</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          {/* Show more button for Public Sector */}
          <div className="text-center pt-2">
            <button className="text-sage-600 text-sm hover:underline">Show 15 more public sector roles →</button>
          </div>
        </div>
      </div>

      {/* Housing */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 pb-2 border-b border-grey-200">Housing</h3>
        <div className="space-y-3">
          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">SHAL Housing, Non-Executive Director & Asset Management Committee Chair (2 roles)</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Strategic asset management and appraising potential development schemes]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Stone Circle, Non-Executive Directors (2 roles)</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Essex Housing, Independent Board Member</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Extensive subject matter expertise in residential development]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (2 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          {/* Show more button for Housing */}
          <div className="text-center pt-2">
            <button className="text-sage-600 text-sm hover:underline">Show 6 more housing roles →</button>
          </div>
        </div>
      </div>

      {/* Healthcare */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 pb-2 border-b border-grey-200">Healthcare</h3>
        <div className="space-y-3">
          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Public Health Wales NHS Trust, Non-Executive Director</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (25 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">NHS University Hospitals Tees, Non-Executive Directors (2 roles)</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Extensive and relevant finance experience in a large and complex organisation]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (29 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Betsi Cadwaladr University Health Board, Independent Member (Finance)</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          {/* Show more button for Healthcare */}
          <div className="text-center pt-2">
            <button className="text-sage-600 text-sm hover:underline">Show 8 more healthcare roles →</button>
          </div>
        </div>
      </div>

      {/* Professional Bodies */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 pb-2 border-b border-grey-200">Professional Bodies</h3>
        <div className="space-y-3">
          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Architects Registration Board, Finance, Risk and Audit Committee, Independent Members (2 roles)</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Financially astute and literate with a relevant current accounting qualification]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (30 Jul)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Financial Ombudsman Service, Non-Executive Directors (2 roles)</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Experience and knowledge of one or more of the following areas: workforce and HR, remuneration or legal]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (8 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          {/* Show more button for Professional Bodies */}
          <div className="text-center pt-2">
            <button className="text-sage-600 text-sm hover:underline">Show 1 more professional body role →</button>
          </div>
        </div>
      </div>

      {/* Not for Profit */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 pb-2 border-b border-grey-200">Not for Profit</h3>
        <div className="space-y-3">
          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">Fashion Revolution, Board Member</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Accounting; Communications; Finance; Governance; Strategy]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium mr-2">(NEW)</span>
                  <h4 className="font-medium text-grey-900">CIMSPA, Chair of the Board of Trustees</h4>
                </div>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (18 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>

          <div className="bg-white border border-grey-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="font-medium text-grey-900">Equity Release Council, Board Member</h4>
                </div>
                <p className="text-sm text-grey-600 mb-2">[Finance; governance; innovation; law; public policy and strategy]</p>
                <div className="flex items-center text-xs text-grey-500">
                  <span className="material-symbols-rounded mr-1 text-xs">schedule</span>
                  <span>View details (1 Aug)</span>
                </div>
              </div>
              <button className="button-secondary text-xs px-3 py-1">View details</button>
            </div>
          </div>
        </div>
      </div>

      {/* View All External Roles Button */}
      <div className="text-center">
        <button className="button-primary">
          View All External Board Roles
        </button>
      </div>
    </section>

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

export default Jobs 