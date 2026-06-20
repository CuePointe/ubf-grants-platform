import React, { useState } from 'react'
import { UBF_LOGO } from '../lib/logo_b64.js'

const SECTIONS = [
  {
    id: 'welcome',
    icon: '👋',
    title: 'Welcome to the UBF Grants Platform',
    color: '#1B5E20',
    bg: '#E8F5E9',
    content: [
      {
        type: 'text',
        value: 'This platform helps the Uganda Biodiversity Fund team track, manage and find grant opportunities — all in one place. You do not need any technical skills to use it. This guide will walk you through everything step by step.'
      },
      {
        type: 'tip',
        value: '💡 Think of this platform like a smart noticeboard for grants. It shows you what is available, when deadlines are, who is working on what, and it can even search for new grants automatically using AI.'
      },
    ]
  },
  {
    id: 'login',
    icon: '🔐',
    title: 'How to Sign In',
    color: '#0D47A1',
    bg: '#E3F2FD',
    content: [
      {
        type: 'text',
        value: 'When you open the platform, you will see a sign-in screen with a list of names. Simply click your own name from the list to enter.'
      },
      {
        type: 'steps',
        value: [
          'Open the platform in your web browser (Chrome or Firefox recommended)',
          'You will see the UBF logo and a list of team member names',
          'Click your name — for example, click "P. Musiime" if you are the Programs Officer',
          'You are now signed in and will see your personalised dashboard',
          'To switch to a different user, scroll to the bottom of the left menu and click "Switch User"',
        ]
      },
      {
        type: 'tip',
        value: '💡 There is no password required. Your name and role automatically determine what you can see and do on the platform.'
      },
    ]
  },
  {
    id: 'dashboard',
    icon: '📊',
    title: 'Understanding the Dashboard',
    color: '#1B5E20',
    bg: '#E8F5E9',
    content: [
      {
        type: 'text',
        value: 'The Dashboard is the first page you see after signing in. It gives you a quick overview of everything important at a glance.'
      },
      {
        type: 'steps',
        value: [
          'The four boxes at the top show key numbers: total grants, total funding potential, urgent deadlines, and awarded grants',
          '"Urgent Deadlines" shows grants closing within the next 21 days — these need immediate attention',
          '"Funding by Batch" shows a visual breakdown of how much money is available across small, medium and large grants',
          '"Strategic Theme Coverage" shows which of UBF\'s priority areas are covered by current grants',
          'Click any urgent grant to open its full details immediately',
        ]
      },
      {
        type: 'explain',
        title: 'What do the Batch colours mean?',
        value: 'Grants are grouped into three Batches based on their size:\n🟡 Batch 1 (Gold) = $1,000 to $100,000 — smaller grants, faster to apply\n🔵 Batch 2 (Blue) = $100,001 to $1,000,000 — medium grants\n🟢 Batch 3 (Green) = Over $1,000,000 — large strategic grants'
      },
    ]
  },
  {
    id: 'tracker',
    icon: '📋',
    title: 'Using the Grant Tracker',
    color: '#4A148C',
    bg: '#F3E5F5',
    content: [
      {
        type: 'text',
        value: 'The Grant Tracker is where you manage all your grant opportunities. You can add new grants, update their status, assign team members, and keep notes.'
      },
      {
        type: 'steps',
        value: [
          'Click "Grant Tracker" in the left menu to open the tracker',
          'You will see a table listing all grants with their deadline, batch, status and assigned lead person',
          'Use the search box to find a specific grant by name or donor',
          'Use the filter dropdowns to show only specific batches or statuses',
          'Click "View →" on any row to open the full details of that grant',
          'In the detail view, you can update the status, assign a lead person, and add notes',
          'Changes are saved automatically when you make them',
        ]
      },
      {
        type: 'explain',
        title: 'How to add a new grant',
        value: '1. Click the green "+ Add Grant" button at the top right of the tracker\n2. Fill in the grant name, donor name, deadline, and grant size\n3. Enter the maximum value in USD — this automatically sets the Batch (1, 2 or 3)\n4. Select the thematic areas that the grant covers\n5. Add the link to the official grant page\n6. Add any notes or action items\n7. Click "✅ Add Grant" to save it'
      },
      {
        type: 'explain',
        title: 'Grant Status meanings',
        value: 'Not Started — you know about it but have not begun\nIn Progress — someone is actively working on the application\nDocuments Gathering — collecting required documents\nUnder Review — application is being reviewed internally\nSubmitted — application has been sent to the donor\nAwarded — grant has been approved and awarded 🎉\nRejected — application was not successful this time'
      },
      {
        type: 'tip',
        value: '💡 Always assign a Lead Person to every grant. This makes it clear who is responsible and prevents grants from falling through the gaps.'
      },
    ]
  },
  {
    id: 'agent',
    icon: '🤖',
    title: 'Using the AI Grants Agent',
    color: '#1B5E20',
    bg: '#E8F5E9',
    content: [
      {
        type: 'text',
        value: 'The AI Agent is like having a grants researcher available 24 hours a day. You can ask it questions in plain English and it will give you helpful, specific answers based on UBF\'s priorities.'
      },
      {
        type: 'steps',
        value: [
          'Click "AI Agent" in the left menu',
          'You will see a chat window — just like sending a text message or WhatsApp',
          'Type your question in the box at the bottom and press Enter or click "Send"',
          'The agent will respond with information, recommendations or grant suggestions',
          'You can also click any of the quick prompt buttons at the top to get started immediately',
        ]
      },
      {
        type: 'explain',
        title: 'What can you ask the agent?',
        value: 'Search for grants: "Find new biodiversity grants available in Uganda"\nGet recommendations: "Which grants should we apply for this month?"\nAsk about roles: "Who on the team should lead the EU application?"\nGet strategic advice: "What grants are available for Karamoja communities?"\nCheck alignment: "Does the Bezos Earth Fund grant match UBF\'s priorities?"'
      },
      {
        type: 'tip',
        value: '💡 The agent already knows UBF\'s Biodiversity Funding Program priorities, your Key Biodiversity Areas, all 5 Program Windows, and your team\'s roles. You do not need to explain UBF — just ask your question.'
      },
      {
        type: 'warning',
        value: '⚠️ The agent needs an internet connection to work. If you see an error message, check that your internet is connected and try again.'
      },
    ]
  },
  {
    id: 'pipeline',
    icon: '📅',
    title: 'Reading the Pipeline Calendar',
    color: '#E65100',
    bg: '#FFF3E0',
    content: [
      {
        type: 'text',
        value: 'The Pipeline Calendar organises all grants by how soon their deadlines are. It helps you see at a glance what needs urgent attention and what you can plan ahead for.'
      },
      {
        type: 'steps',
        value: [
          'Click "Pipeline" in the left menu',
          'Grants are grouped into sections: This Week, This Month, Next 3 Months, and Later',
          'Each grant card shows the deadline countdown, batch colour, grant name and size',
          'Grants with red deadline badges need immediate action',
          'Click any grant card to open its full details in the tracker',
        ]
      },
      {
        type: 'explain',
        title: 'Deadline badge colours',
        value: '🔴 Red = Closes within 7 days — URGENT, act immediately\n🟠 Orange = Closes within 21 days — Begin application now\n🟡 Yellow = Closes within 60 days — Start planning\n🟢 Green = More than 60 days — Monitor and plan ahead'
      },
    ]
  },
  {
    id: 'team',
    icon: '👥',
    title: 'The Team Page',
    color: '#37474F',
    bg: '#ECEFF1',
    content: [
      {
        type: 'text',
        value: 'The Team page shows all UBF grants team members, how many grants each person is assigned to, and useful reference information about UBF\'s program areas and Key Biodiversity Areas.'
      },
      {
        type: 'steps',
        value: [
          'Click "Team" in the left menu',
          'Each team member card shows their name, role and email',
          'The "Assigned" number shows how many grants they are leading',
          'The "Urgent" number shows how many of their grants have deadlines within 21 days',
          'A red urgent number means that person needs support immediately',
          'Scroll down to see the UBF Program Windows and Key Biodiversity Areas reference',
        ]
      },
    ]
  },
  {
    id: 'tips',
    icon: '💡',
    title: 'Top Tips for Using the Platform',
    color: '#F57F17',
    bg: '#FFFDE7',
    content: [
      {
        type: 'list',
        value: [
          'Check the Dashboard every Monday morning to review urgent deadlines for the week',
          'When you receive a grant email, add it to the tracker immediately — even if you are not sure about it yet',
          'Always fill in the "Link to the Call" when adding a grant so anyone can find the official page easily',
          'Assign a Lead Person to every grant as soon as you add it — unassigned grants often get forgotten',
          'Use the AI Agent before spending time searching the internet for grants',
          'Update the status of grants regularly — this helps the whole team know what is happening',
          'When a grant is submitted, mark it as "Submitted" and note the date in the notes field',
          'When a grant is awarded or rejected, update the status immediately so the dashboard stays accurate',
          'Use the notes field to record important information like eligibility requirements, key contacts, and watch-outs',
          'The platform works best on a laptop or desktop computer, but also works on a smartphone',
        ]
      },
    ]
  },
  {
    id: 'trouble',
    icon: '🛠️',
    title: 'Common Questions and Troubleshooting',
    color: '#C62828',
    bg: '#FFEBEE',
    content: [
      {
        type: 'qa',
        items: [
          {
            q: 'I cannot see my grants — the tracker looks empty',
            a: 'The platform stores data in your browser. If you are using a different browser or device from usual, you may not see previously entered grants. Always use the same browser on the same device. Ask T. Otieno if you need help.'
          },
          {
            q: 'The AI Agent says "connection error"',
            a: 'This means the internet connection was lost during the conversation. Check your internet connection and try sending your message again. The agent needs a stable internet connection to work.'
          },
          {
            q: 'I made a mistake when adding a grant — how do I fix it?',
            a: 'Open the grant by clicking "View →" in the tracker. You can update the status, assignee and notes directly. To fix the name, donor or other fields, scroll to the bottom and delete the grant, then add it again with the correct information.'
          },
          {
            q: 'I accidentally deleted a grant',
            a: 'Unfortunately deleted grants cannot be recovered. Please add the grant again. To avoid this, always click "Cancel" when you see the delete confirmation if you are not sure.'
          },
          {
            q: 'The deadline countdown shows the wrong number of days',
            a: 'The countdown is calculated from today\'s date automatically. If it looks wrong, check that the deadline date was entered correctly when the grant was added (format: YYYY-MM-DD).'
          },
          {
            q: 'Can two people use the platform at the same time?',
            a: 'Yes — each person uses it on their own device and browser. However, changes made on one device do not automatically appear on another device. This will be resolved when the platform is connected to the Supabase cloud database in the next phase.'
          },
          {
            q: 'Who do I contact if I need help?',
            a: 'Contact T. Otieno (t.otieno@biodiversityfund.org) for any questions about using the platform. For technical issues, contact the platform administrator.'
          },
        ]
      },
    ]
  },
]

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState('welcome')

  const section = SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="animate-in" style={{ display: 'flex', gap: 20, minHeight: '80vh' }}>

      {/* Sidebar navigation */}
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ background: 'white', borderRadius: 14, padding: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', position: 'sticky', top: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
            Guide Contents
          </div>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 12px', border: 'none', borderRadius: 8,
                background: activeSection === s.id ? s.bg : 'transparent',
                color: activeSection === s.id ? s.color : '#555',
                cursor: 'pointer', fontSize: 12,
                fontWeight: activeSection === s.id ? 600 : 400,
                textAlign: 'left', marginBottom: 2,
                borderLeft: activeSection === s.id ? `3px solid ${s.color}` : '3px solid transparent',
              }}
            >
              <span>{s.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ background: 'white', borderRadius: 14, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: `2px solid ${section.bg}` }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: section.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              {section.icon}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: section.color, margin: 0 }}>
              {section.title}
            </h2>
          </div>

          {/* Section content */}
          {section.content.map((block, i) => {
            if (block.type === 'text') return (
              <p key={i} style={{ fontSize: 14, color: '#333', lineHeight: 1.75, marginBottom: 20 }}>
                {block.value}
              </p>
            )

            if (block.type === 'tip') return (
              <div key={i} style={{ padding: '14px 18px', background: '#E8F5E9', borderRadius: 10, border: '1px solid #C8E6C9', marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: '#2E7D32', lineHeight: 1.7, margin: 0 }}>{block.value}</p>
              </div>
            )

            if (block.type === 'warning') return (
              <div key={i} style={{ padding: '14px 18px', background: '#FFF3E0', borderRadius: 10, border: '1px solid #FFE0B2', marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: '#E65100', lineHeight: 1.7, margin: 0 }}>{block.value}</p>
              </div>
            )

            if (block.type === 'steps') return (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                  Step by Step
                </div>
                {block.value.map((step, j) => (
                  <div key={j} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: section.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                      {j + 1}
                    </div>
                    <p style={{ fontSize: 13, color: '#333', lineHeight: 1.65, margin: 0 }}>{step}</p>
                  </div>
                ))}
              </div>
            )

            if (block.type === 'explain') return (
              <div key={i} style={{ padding: '16px 20px', background: section.bg, borderRadius: 10, marginBottom: 20, borderLeft: `4px solid ${section.color}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: section.color, marginBottom: 8 }}>{block.title}</div>
                <p style={{ fontSize: 13, color: '#333', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-line' }}>{block.value}</p>
              </div>
            )

            if (block.type === 'list') return (
              <div key={i} style={{ marginBottom: 20 }}>
                {block.value.map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: section.color, fontSize: 16, flexShrink: 0 }}>✓</span>
                    <p style={{ fontSize: 13, color: '#333', lineHeight: 1.65, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            )

            if (block.type === 'qa') return (
              <div key={i}>
                {block.items.map((item, j) => (
                  <div key={j} style={{ marginBottom: 18, padding: '16px 20px', background: '#FAFAFA', borderRadius: 10, border: '1px solid #F0F0F0' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#C62828', marginBottom: 8 }}>
                      ❓ {item.q}
                    </div>
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.7 }}>
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            )

            return null
          })}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid #F0F0F0' }}>
            {SECTIONS.findIndex(s => s.id === activeSection) > 0 ? (
              <button
                onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) - 1].id)}
                style={{ padding: '9px 18px', background: 'white', border: '1.5px solid #E0E0E0', borderRadius: 9, fontSize: 13, cursor: 'pointer', color: '#555' }}
              >
                ← Previous
              </button>
            ) : <div />}
            {SECTIONS.findIndex(s => s.id === activeSection) < SECTIONS.length - 1 ? (
              <button
                onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) + 1].id)}
                style={{ padding: '9px 18px', background: '#1B5E20', color: 'white', border: 'none', borderRadius: 9, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
              >
                Next →
              </button>
            ) : (
              <div style={{ padding: '9px 18px', background: '#E8F5E9', color: '#2E7D32', borderRadius: 9, fontSize: 13, fontWeight: 600 }}>
                ✅ Guide complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
