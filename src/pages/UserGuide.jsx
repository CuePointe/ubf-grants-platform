import React, { useState } from 'react'

const SECTIONS = [
  {
    id: 'getting-started',
    title: '1. Getting Started',
    icon: '🚀',
    content: [
      {
        heading: 'Signing In',
        text: 'On the login screen, select your name from the dropdown list and click Sign In. No password is required — this platform is for internal UBF team use only.',
      },
      {
        heading: 'Navigation',
        text: 'Use the sidebar on the left to switch between sections: Dashboard, Grant Tracker, AI Agent, Pipeline, Team View, and this User Guide.',
      },
      {
        heading: 'Switching Users',
        text: 'To switch to a different team member, click "Switch User" at the bottom of the sidebar.',
      },
    ],
  },
  {
    id: 'grant-tracker',
    title: '2. Grant Tracker',
    icon: '📋',
    content: [
      {
        heading: 'Adding a Grant',
        text: 'Click the "+ Add Grant" button in the Grant Tracker. Fill in as much information as you have — at minimum the grant name. You can update it later as more details become available.',
      },
      {
        heading: 'Required Fields',
        text: 'Only the Grant Name is required. However, we recommend always filling in the Deadline, Status, Priority, and Assignee fields so the team can track progress effectively.',
      },
      {
        heading: 'Updating a Grant',
        text: 'Click on any grant in the table to open its detail view. Click "Edit" to update the information. Click "Save Grant" when done.',
      },
      {
        heading: 'Status Options',
        text: 'Not Started → In Progress → Submitted → Under Review → Awarded or Rejected. Update the status as the grant moves through the process.',
      },
      {
        heading: 'Priority Levels',
        text: 'High = must pursue urgently. Medium = important but not urgent. Low = track but not actively working on. Use this to help the team focus effort.',
      },
      {
        heading: 'Deleting a Grant',
        text: 'Open the grant detail view and scroll to the bottom. Click "Delete Grant" and confirm. This cannot be undone, so be sure before deleting.',
      },
    ],
  },
  {
    id: 'pipeline',
    title: '3. Pipeline Calendar',
    icon: '📅',
    content: [
      {
        heading: 'Understanding the Calendar',
        text: 'The Pipeline page organises all active grants by deadline urgency: Overdue, This Week, Next 2 Weeks, This Month, and Upcoming. Check this daily to stay on top of deadlines.',
      },
      {
        heading: 'Colour Coding',
        text: 'Red = urgent (this week), Orange = next 2 weeks, Yellow = this month, Green = upcoming. Grey = overdue or no deadline.',
      },
      {
        heading: 'Clicking a Grant Card',
        text: 'Click any grant card to navigate to its full detail in the Grant Tracker, where you can view or edit all information.',
      },
    ],
  },
  {
    id: 'ai-agent',
    title: '4. AI Grants Agent',
    icon: '🤖',
    content: [
      {
        heading: 'What the AI Agent Does',
        text: 'The AI Agent can help you search for grant opportunities, analyse funding requirements, draft concept notes, and provide strategic advice on grant applications — all tailored to UBF\'s biodiversity work in Uganda.',
      },
      {
        heading: 'Setting Up the API Key',
        text: 'To use the AI Agent, you need an Anthropic API key. Click "Set API Key" in the top-right of the Agent page, enter your key (starts with sk-ant-), and click Save. The key is stored only in your browser.',
      },
      {
        heading: 'Starting a Conversation',
        text: 'Type your question or request in the text box at the bottom and press Enter or click Send. You can also click any of the suggested prompts to get started quickly.',
      },
      {
        heading: 'Example Requests',
        text: 'Try: "Search for biodiversity grants open to Ugandan NGOs", "Help me write a concept note introduction for a wetlands restoration project", or "Which funders focus on community livelihoods in East Africa?"',
      },
      {
        heading: 'Context Awareness',
        text: 'The agent is aware of your current grant pipeline (up to 20 grants). You can ask it to review your pipeline or advise on priorities.',
      },
    ],
  },
  {
    id: 'team-view',
    title: '5. Team View',
    icon: '👥',
    content: [
      {
        heading: 'What It Shows',
        text: 'The Team View shows each team member\'s active grant assignments, with any urgent deadlines highlighted. Use this to see workload distribution across the team.',
      },
      {
        heading: 'Assigning Grants',
        text: 'Assignments are set when adding or editing a grant in the Grant Tracker. Select the lead team member from the "Lead Assignee" dropdown.',
      },
    ],
  },
  {
    id: 'data',
    title: '6. Data & Storage',
    icon: '💾',
    content: [
      {
        heading: 'Where Data is Stored',
        text: 'Currently (Phase 1), all grant data is stored in your browser\'s local storage. This means data is device-specific — if you use a different computer or clear your browser data, the grants will not be there.',
      },
      {
        heading: 'Backing Up Your Data',
        text: 'To share data with the team, you will need to enter the same grants on each device for now. Phase 2 will introduce cloud storage (Supabase) so all staff see the same data in real time.',
      },
      {
        heading: 'Phase 2: Cloud Database',
        text: 'The platform is designed to migrate to Supabase cloud storage. When this is set up, all team members will share the same live grants data across devices. Contact T. Otieno to arrange this upgrade.',
      },
    ],
  },
  {
    id: 'tips',
    title: '7. Tips & Best Practices',
    icon: '💡',
    content: [
      {
        heading: 'Weekly Routine',
        text: 'Check the Dashboard every Monday morning. Review the Pipeline page for deadlines this week. Update the status of any grants that have moved forward.',
      },
      {
        heading: 'Keeping Records Clean',
        text: 'Update grant statuses promptly — especially when submitted or when you hear back. A clean pipeline helps the whole team know where things stand.',
      },
      {
        heading: 'Using Notes Effectively',
        text: 'The Notes field is great for storing: key funder contact names, requirements you discovered, strategy notes, or links to related documents in Google Drive.',
      },
      {
        heading: 'Need Help?',
        text: 'For platform questions, contact T. Otieno at t.otieno@biodiversityfund.org',
      },
    ],
  },
]

export default function UserGuide() {
  const [open, setOpen] = useState('getting-started')

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>Staff User Guide</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
          Step-by-step guide for using the UBF Grants Intelligence Platform
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Contents nav */}
        <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 10, letterSpacing: 0.5 }}>CONTENTS</div>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setOpen(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                width: '100%', padding: '8px 10px', borderRadius: 7,
                border: 'none', textAlign: 'left', fontSize: 12, cursor: 'pointer',
                background: open === s.id ? '#f0fdf4' : 'transparent',
                color: open === s.id ? '#1a6b3c' : '#475569',
                fontWeight: open === s.id ? 600 : 400,
                marginBottom: 2,
              }}
            >
              <span>{s.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {SECTIONS.filter(s => s.id === open).map(section => (
            <div key={section.id} style={{ animation: 'fadeIn 0.2s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>{section.icon}</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a6b3c' }}>{section.title}</h2>
              </div>
              {section.content.map((item, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 10, padding: '16px 20px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 12,
                  borderLeft: '3px solid #1a6b3c',
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
                    {item.heading}
                  </h3>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                {SECTIONS.findIndex(s => s.id === open) > 0 && (
                  <button
                    onClick={() => setOpen(SECTIONS[SECTIONS.findIndex(s => s.id === open) - 1].id)}
                    style={{ padding: '8px 16px', borderRadius: 7, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                  >← Previous</button>
                )}
                {SECTIONS.findIndex(s => s.id === open) < SECTIONS.length - 1 && (
                  <button
                    onClick={() => setOpen(SECTIONS[SECTIONS.findIndex(s => s.id === open) + 1].id)}
                    style={{ padding: '8px 16px', borderRadius: 7, border: 'none', background: '#1a6b3c', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' }}
                  >Next →</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
