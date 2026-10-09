import { useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Baby, Bell, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Clock3, CreditCard,
  Download, FileBarChart, FlaskConical, HeartPulse, LayoutDashboard, Menu, Package,
  Plus, Search, Settings, ShieldCheck, Stethoscope, Users, UserRound, Wallet,
  X, Pill, Boxes, SlidersHorizontal, MoreHorizontal, ArrowRight, Sparkles, Building2,
  LogOut, CircleHelp, CheckCircle2, TrendingUp, Filter, CalendarCheck, Syringe
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { InventoryItem, Patient } from './types'

type PageKey = 'Overview' | 'Patients' | 'Appointments' | 'Clinical workspace' | 'ANC / Maternal care' | 'Family planning' | 'Laboratory' | 'Pharmacy' | 'Inventory' | 'Billing' | 'Reports' | 'Staff' | 'Settings'

const navigation: { label: PageKey; icon: LucideIcon; group: string }[] = [
  { label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
  { label: 'Patients', icon: Users, group: 'WORKSPACE' },
  { label: 'Appointments', icon: CalendarDays, group: 'WORKSPACE' },
  { label: 'Clinical workspace', icon: Stethoscope, group: 'CARE DELIVERY' },
  { label: 'ANC / Maternal care', icon: Baby, group: 'CARE DELIVERY' },
  { label: 'Family planning', icon: HeartPulse, group: 'CARE DELIVERY' },
  { label: 'Laboratory', icon: FlaskConical, group: 'OPERATIONS' },
  { label: 'Pharmacy', icon: Pill, group: 'OPERATIONS' },
  { label: 'Inventory', icon: Boxes, group: 'OPERATIONS' },
  { label: 'Billing', icon: CreditCard, group: 'OPERATIONS' },
  { label: 'Reports', icon: FileBarChart, group: 'MANAGEMENT' },
  { label: 'Staff', icon: UserRound, group: 'MANAGEMENT' },
  { label: 'Settings', icon: Settings, group: 'MANAGEMENT' }
]

const initialPatients: Patient[] = [
  { id: 'PT-24018', name: 'Chinwe Okafor', code: 'MHS-24018', age: 28, sex: 'Female', phone: '+234 803 555 0182', lastVisit: 'Today, 09:12 AM', status: 'Active', bloodGroup: 'O+' },
  { id: 'PT-24017', name: 'Emeka Nwosu', code: 'MHS-24017', age: 42, sex: 'Male', phone: '+234 806 555 0147', lastVisit: 'Today, 08:45 AM', status: 'Follow-up', bloodGroup: 'A+' },
  { id: 'PT-24016', name: 'Amina Bello', code: 'MHS-24016', age: 31, sex: 'Female', phone: '+234 809 555 0106', lastVisit: 'Yesterday', status: 'Active', bloodGroup: 'B+' },
  { id: 'PT-24015', name: 'David Eze', code: 'MHS-24015', age: 7, sex: 'Male', phone: '+234 802 555 0133', lastVisit: 'Yesterday', status: 'New', bloodGroup: 'O-' },
  { id: 'PT-24014', name: 'Ngozi Adeyemi', code: 'MHS-24014', age: 36, sex: 'Female', phone: '+234 807 555 0194', lastVisit: '08 Oct 2026', status: 'Follow-up', bloodGroup: 'AB+' },
  { id: 'PT-24013', name: 'Samuel Ibrahim', code: 'MHS-24013', age: 54, sex: 'Male', phone: '+234 805 555 0161', lastVisit: '08 Oct 2026', status: 'Active', bloodGroup: 'A-' }
]
const initialInventory: InventoryItem[] = [
  { id: 'INV-001', name: 'Paracetamol 500mg', category: 'Medicine', sku: 'MED-PAR-500', quantity: 420, unit: 'tablets', reorderAt: 100, price: 25, location: 'Pharmacy shelf A' },
  { id: 'INV-002', name: 'Examination gloves', category: 'Consumable', sku: 'CON-GLV-M', quantity: 36, unit: 'boxes', reorderAt: 40, price: 1800, location: 'Store room' },
  { id: 'INV-003', name: 'Malaria RDT kit', category: 'Diagnostic', sku: 'DIA-MAL-RDT', quantity: 84, unit: 'kits', reorderAt: 25, price: 950, location: 'Laboratory' },
  { id: 'INV-004', name: 'Normal saline 0.9%', category: 'Medicine', sku: 'MED-NS-500', quantity: 18, unit: 'bottles', reorderAt: 20, price: 1200, location: 'Treatment room' },
  { id: 'INV-005', name: 'Syringes 5ml', category: 'Consumable', sku: 'CON-SYR-5', quantity: 190, unit: 'pieces', reorderAt: 50, price: 90, location: 'Store room' },
  { id: 'INV-006', name: 'Folic acid 5mg', category: 'Medicine', sku: 'MED-FOL-5', quantity: 12, unit: 'packs', reorderAt: 20, price: 650, location: 'Pharmacy shelf B' }
]
const appointments = [
  { time: '09:00 AM', name: 'Chinwe Okafor', type: 'ANC review', clinician: 'Dr. A. Okoro', status: 'Checked in', initials: 'CO', color: 'mint' },
  { time: '09:30 AM', name: 'Emeka Nwosu', type: 'General consultation', clinician: 'Dr. M. Eze', status: 'In progress', initials: 'EN', color: 'blue' },
  { time: '10:00 AM', name: 'Amina Bello', type: 'Family planning', clinician: 'Nurse I. Musa', status: 'Waiting', initials: 'AB', color: 'peach' },
  { time: '10:30 AM', name: 'David Eze', type: 'Paediatric review', clinician: 'Dr. A. Okoro', status: 'Waiting', initials: 'DE', color: 'lilac' }
]

function initials(name: string) { return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() }
function money(n: number) { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n) }

export default function App() {
  const [page, setPage] = useState<PageKey>('Overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState(initialPatients)
  const [inventory, setInventory] = useState(initialInventory)
  const [modal, setModal] = useState<'patient' | 'stock' | 'appointment' | null>(null)
  const [toast, setToast] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [patientFilter, setPatientFilter] = useState('All patients')
  const [stockFilter, setStockFilter] = useState('All categories')
  const [patientName, setPatientName] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [patientSex, setPatientSex] = useState<'Female' | 'Male'>('Female')
  const [stockName, setStockName] = useState('')
  const [stockQty, setStockQty] = useState('')
  const [stockCategory, setStockCategory] = useState('Medicine')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }
  const filteredPatients = useMemo(() => patients.filter(p => {
    const term = search.toLowerCase()
    const matchesSearch = [p.name, p.code, p.phone].some(v => v.toLowerCase().includes(term))
    const matchesFilter = patientFilter === 'All patients' || p.status === patientFilter
    return matchesSearch && matchesFilter
  }), [patients, search, patientFilter])
  const filteredInventory = useMemo(() => inventory.filter(item => {
    const term = search.toLowerCase()
    const matchesSearch = [item.name, item.sku, item.category].some(v => v.toLowerCase().includes(term))
    return matchesSearch && (stockFilter === 'All categories' || item.category === stockFilter)
  }), [inventory, search, stockFilter])

  const addPatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientName.trim() || !patientAge || !patientPhone.trim()) return
    const newPatient: Patient = {
      id: `PT-${Date.now().toString().slice(-5)}`,
      code: `MHS-${Date.now().toString().slice(-5)}`,
      name: patientName.trim(), age: Number(patientAge), sex: patientSex, phone: patientPhone.trim(),
      lastVisit: 'Just now', status: 'New', bloodGroup: 'Not recorded'
    }
    setPatients(prev => [newPatient, ...prev])
    setPatientName(''); setPatientAge(''); setPatientPhone(''); setModal(null); setPage('Patients')
    notify('Patient added to this demo session.')
  }
  const addStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stockName.trim() || !stockQty || Number(stockQty) < 0) return
    const item: InventoryItem = {
      id: `INV-${String(inventory.length + 1).padStart(3, '0')}`, name: stockName.trim(), category: stockCategory,
      sku: `NEW-${Date.now().toString().slice(-5)}`, quantity: Number(stockQty), unit: 'units', reorderAt: 10,
      price: 0, location: 'Main store'
    }
    setInventory(prev => [item, ...prev]); setStockName(''); setStockQty(''); setModal(null)
    notify('Inventory item added to this demo session.')
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Activity size={23} strokeWidth={2.5} /></div>
        <div><div className="brand-name">MaCoKi <span>Health</span></div><div className="brand-sub">SUITE <span>•</span> MHS01</div></div>
        <button className="icon-button close-mobile" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18}/></button>
      </div>
      <div className="clinic-switch"><div className="clinic-icon"><Building2 size={17}/></div><div className="clinic-copy"><b>MaCoKi Health Centre</b><small>Clinic workspace</small></div><ChevronDown size={15}/></div>
      <nav className="nav-list">
        {['WORKSPACE', 'CARE DELIVERY', 'OPERATIONS', 'MANAGEMENT'].map(group => <div className="nav-group" key={group}>
          <div className="nav-label">{group}</div>
          {navigation.filter(item => item.group === group).map(item => {
            const Icon = item.icon
            return <button key={item.label} className={`nav-item ${page === item.label ? 'active' : ''}`} onClick={() => { setPage(item.label); setMobileNav(false); setSearch('') }}>
              <Icon size={18} strokeWidth={1.9}/><span>{item.label}</span>
              {item.label === 'Inventory' && inventory.some(i => i.quantity <= i.reorderAt) && <span className="nav-dot"/>}
            </button>
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="support-card"><div className="support-icon"><CircleHelp size={17}/></div><div><b>Need a hand?</b><small>Visit the help centre</small></div><ArrowRight size={15}/></div>
        <div className="sidebar-user"><div className="avatar avatar-teal">AO</div><div className="user-copy"><b>Admin Officer</b><small>Administrator</small></div><button className="icon-button" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile menu"><MoreHorizontal size={19}/></button>
          {profileOpen && <div className="profile-menu"><button onClick={() => { setPage('Settings'); setProfileOpen(false) }}><Settings size={15}/> Account settings</button><button onClick={() => notify('Sign-out is not connected in this frontend prototype.')}><LogOut size={15}/> Sign out</button></div>}
        </div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-button menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={21}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <b>{page}</b></div></div>
        <div className="topbar-actions">
          <label className="global-search"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
          <button className={`icon-button notification-button ${notificationsOpen ? 'pressed' : ''}`} onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications"><Bell size={19}/><i/></button>
          <div className="top-divider"/>
          <div className="top-user"><div className="avatar avatar-teal">AO</div><div><b>Admin Officer</b><small>Administrator</small></div><ChevronDown size={15}/></div>
        </div>
      </header>
      {notificationsOpen && <div className="notification-popover"><div className="popover-heading">Notifications <span className="badge badge-warning">3 new</span></div><div className="notification-row"><span className="notification-symbol warning"><AlertTriangle size={16}/></span><div><b>Stock running low</b><p>3 items are at or below reorder level.</p><small>Just now</small></div></div><div className="notification-row"><span className="notification-symbol blue"><CalendarCheck size={16}/></span><div><b>Appointments today</b><p>12 appointments are on today's schedule.</p><small>15 minutes ago</small></div></div><div className="notification-row"><span className="notification-symbol green"><CheckCircle2 size={16}/></span><div><b>Daily summary ready</b><p>Your clinic activity summary is available.</p><small>1 hour ago</small></div></div></div>}

      <div className="page-content">
        {page === 'Overview' && <Dashboard setPage={setPage} patients={patients} inventory={inventory} onAddPatient={() => setModal('patient')} onAddAppointment={() => setModal('appointment')} />}
        {page === 'Patients' && <PatientsPage patients={filteredPatients} total={patients.length} filter={patientFilter} setFilter={setPatientFilter} onAdd={() => setModal('patient')} onView={(p) => notify(`Opened profile preview for ${p.name}.`)} />}
        {page === 'Inventory' && <InventoryPage items={filteredInventory} filter={stockFilter} setFilter={setStockFilter} onAdd={() => setModal('stock')} onAdjust={(id) => { setInventory(prev => prev.map(i => i.id === id ? {...i, quantity: i.quantity + 10} : i)); notify('Demo stock adjustment: +10 units.') }} />}
        {page === 'Appointments' && <AppointmentsPage onAdd={() => setModal('appointment')} />}
        {page === 'Clinical workspace' && <ClinicalPage notify={notify} />}
        {page === 'ANC / Maternal care' && <ModulePage title="ANC & Maternal Care" eyebrow="CARE DELIVERY" description="Support antenatal visits, maternal observations and follow-up planning in one workspace." icon={Baby} stats={[['ANC clients this month','86'],['Visits due today','12'],['Follow-ups overdue','4']]} sections={['ANC registration','Antenatal visit record','Maternal observations','Birth plan & referrals']} notify={notify}/>}
        {page === 'Family planning' && <ModulePage title="Family Planning" eyebrow="CARE DELIVERY" description="Manage counselling, method selection, follow-up schedules and service records." icon={HeartPulse} stats={[['Active clients','142'],['Counselling today','8'],['Follow-ups due','16']]} sections={['Client counselling','Method provision','Follow-up register','Commodity use']} notify={notify}/>}
        {page === 'Laboratory' && <ModulePage title="Laboratory" eyebrow="OPERATIONS" description="Track laboratory requests, specimen workflow and result review." icon={FlaskConical} stats={[['Requests today','24'],['Awaiting results','7'],['Completed today','17']]} sections={['Test request queue','Specimen collection','Result entry','Result review']} notify={notify}/>}
        {page === 'Pharmacy' && <ModulePage title="Pharmacy" eyebrow="OPERATIONS" description="Review prescriptions, dispense items and monitor medicine availability." icon={Pill} stats={[['Prescriptions today','31'],['Awaiting dispensing','6'],['Low-stock medicines','3']]} sections={['Prescription queue','Dispensing register','Medicine catalogue','Returns & adjustments']} notify={notify}/>}
        {page === 'Billing' && <ModulePage title="Billing & Payments" eyebrow="OPERATIONS" description="Review invoices, record payment status and follow up outstanding balances." icon={Wallet} stats={[['Collected today',money(284500)],['Invoices today','38'],['Outstanding',money(126000)]}]} sections={['Create invoice','Payment register','Outstanding balances','Service price list']} notify={notify}/>}
        {page === 'Reports' && <ReportsPage notify={notify}/>}
        {page === 'Staff' && <StaffPage notify={notify}/>}
        {page === 'Settings' && <SettingsPage notify={notify}/>}
      </div>
      <footer className="app-footer"><span>© 2026 MaCoKi Health Suite <span className="footer-dot">•</span> MHS01</span><span><span className="status-pulse"/> Frontend demo <span className="footer-dot">•</span> Django API not connected</span></footer>
    </main>

    {modal && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModal(null) }}>
      <div className="modal">
        <div className="modal-header"><div><div className="eyebrow">{modal === 'patient' ? 'PATIENT MANAGEMENT' : modal === 'stock' ? 'INVENTORY MANAGEMENT' : 'SCHEDULE MANAGEMENT'}</div><h2>{modal === 'patient' ? 'Register new patient' : modal === 'stock' ? 'Add inventory item' : 'Schedule appointment'}</h2><p>{modal === 'patient' ? 'Enter the basic details to create a demo patient record.' : modal === 'stock' ? 'Add an item to the in-memory inventory list.' : 'Create an appointment placeholder for the demo.'}</p></div><button className="icon-button" onClick={() => setModal(null)} aria-label="Close dialog"><X size={20}/></button></div>
        {modal === 'patient' && <form onSubmit={addPatient} className="modal-form"><label>Full name<input autoFocus value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="e.g. Ada Okeke" required/></label><div className="form-grid"><label>Age<input type="number" min="0" max="120" value={patientAge} onChange={e => setPatientAge(e.target.value)} placeholder="Age" required/></label><label>Sex<select value={patientSex} onChange={e => setPatientSex(e.target.value as 'Female'|'Male')}><option>Female</option><option>Male</option></select></label></div><label>Phone number<input value={patientPhone} onChange={e => setPatientPhone(e.target.value)} placeholder="+234..." required/></label><div className="notice-box"><ShieldCheck size={17}/><span>Demo only: this record is kept in page memory and is not saved to a database.</span></div><div className="modal-actions"><button type="button" className="btn btn-light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="btn btn-primary"><Plus size={16}/> Register patient</button></div></form>}
        {modal === 'stock' && <form onSubmit={addStock} className="modal-form"><label>Item name<input autoFocus value={stockName} onChange={e => setStockName(e.target.value)} placeholder="e.g. Cotton wool" required/></label><div className="form-grid"><label>Category<select value={stockCategory} onChange={e => setStockCategory(e.target.value)}><option>Medicine</option><option>Consumable</option><option>Diagnostic</option><option>Equipment</option></select></label><label>Opening quantity<input type="number" min="0" value={stockQty} onChange={e => setStockQty(e.target.value)} placeholder="0" required/></label></div><div className="notice-box"><ShieldCheck size={17}/><span>Demo only: no database, batch tracking or audit log is connected yet.</span></div><div className="modal-actions"><button type="button" className="btn btn-light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="btn btn-primary"><Plus size={16}/> Add item</button></div></form>}
        {modal === 'appointment' && <form onSubmit={e => { e.preventDefault(); setModal(null); notify('Appointment form submitted in demo mode. No appointment was persisted.') }} className="modal-form"><label>Patient name<input placeholder="Search or enter patient name" required/></label><div className="form-grid"><label>Date<input type="date" defaultValue="2026-10-09" required/></label><label>Time<input type="time" defaultValue="11:00" required/></label></div><label>Appointment type<select><option>General consultation</option><option>ANC review</option><option>Family planning</option><option>Laboratory review</option><option>Paediatric review</option></select></label><div className="notice-box"><ShieldCheck size={17}/><span>This is a frontend-only appointment placeholder.</span></div><div className="modal-actions"><button type="button" className="btn btn-light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="btn btn-primary"><CalendarDays size={16}/> Create appointment</button></div></form>}
      </div>
    </div>}
    {toast && <div className="toast"><CheckCircle2 size={18}/><span>{toast}</span><button onClick={() => setToast('')} aria-label="Dismiss"><X size={15}/></button></div>}
  </div>
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>
}
function Dashboard({ setPage, patients, inventory, onAddPatient, onAddAppointment }: { setPage: (p: PageKey) => void; patients: Patient[]; inventory: InventoryItem[]; onAddPatient: () => void; onAddAppointment: () => void }) {
  const lowStock = inventory.filter(i => i.quantity <= i.reorderAt)
  return <>
    <PageHeading eyebrow="FRIDAY, 09 OCTOBER 2026" title="Good morning, Admin Officer" description="Here's what's happening at your clinic today." action={<><button className="btn btn-light" onClick={onAddAppointment}><CalendarDays size={16}/> Schedule visit</button><button className="btn btn-primary" onClick={onAddPatient}><Plus size={17}/> New patient</button></>}/>
    <div className="welcome-banner"><div className="welcome-art"><div className="welcome-orbit orbit-one"/><div className="welcome-orbit orbit-two"/><div className="welcome-cross"><Plus size={31}/></div><HeartPulse className="welcome-heart" size={48}/></div><div className="welcome-copy"><span className="welcome-label"><Sparkles size={13}/> YOUR CLINIC AT A GLANCE</span><h2>Care that connects.<br/><em>Operations that flow.</em></h2><p>Manage patient journeys, clinical services and daily operations from one workspace.</p></div><div className="welcome-metric"><span>Clinic activity</span><b>On track <span className="activity-dot"/></b><small><TrendingUp size={13}/> Daily overview is ready</small></div></div>
    <div className="section-heading"><div><h2>Today's overview</h2><p>Key indicators for your clinic</p></div><button className="text-button" onClick={() => setPage('Reports')}>View reports <ArrowRight size={15}/></button></div>
    <div className="stats-grid">
      <StatCard icon={Users} label="Total patients" value={String(patients.length + 1248)} delta="+8.2%" caption="vs. last month" tone="teal" trend="up"/>
      <StatCard icon={CalendarCheck} label="Appointments today" value="24" delta="18 confirmed" caption="6 still to check in" tone="blue" trend="up"/>
      <StatCard icon={Stethoscope} label="Consultations" value="17" delta="+12.5%" caption="vs. yesterday" tone="purple" trend="up"/>
      <StatCard icon={Wallet} label="Revenue today" value={money(284500)} delta="+6.4%" caption="vs. yesterday" tone="orange" trend="up"/>
    </div>
    <div className="dashboard-columns">
      <section className="panel appointments-panel"><div className="panel-header"><div><h3>Today's appointments</h3><p>Upcoming patient visits</p></div><button className="text-button" onClick={() => setPage('Appointments')}>View schedule <ArrowRight size={15}/></button></div><div className="appointment-list">{appointments.map((a, i) => <div className="appointment-row" key={a.name}><div className="appointment-time">{a.time}</div><div className={`avatar avatar-${a.color}`}>{a.initials}</div><div className="appointment-info"><b>{a.name}</b><span>{a.type} <i>·</i> {a.clinician}</span></div><span className={`status status-${a.status.toLowerCase().replace(' ', '-')}`}>{a.status}</span><button className="icon-button row-more" onClick={() => setPage('Appointments')} aria-label={`View ${a.name}`}><MoreHorizontal size={18}/></button></div>)}</div><button className="panel-bottom-link" onClick={() => setPage('Appointments')}>View all appointments <ArrowRight size={15}/></button></section>
      <section className="panel inventory-panel"><div className="panel-header"><div><h3>Inventory watch</h3><p>Items needing attention</p></div><button className="icon-button" onClick={() => setPage('Inventory')} aria-label="Open inventory"><ArrowRight size={17}/></button></div>{lowStock.length === 0 ? <div className="empty-state"><CheckCircle2 size={25}/><b>Stock levels look good</b><span>No items are below reorder level.</span></div> : <div className="stock-watch-list">{lowStock.slice(0, 4).map(item => <div className="stock-watch-row" key={item.id}><div className="stock-item-icon"><Package size={17}/></div><div className="stock-item-copy"><b>{item.name}</b><span>{item.category} · {item.location}</span><div className="stock-progress"><i style={{ width: `${Math.max(8, Math.min(100, item.quantity / item.reorderAt * 100))}%` }}/></div></div><div className="stock-qty"><b>{item.quantity}</b><span>{item.unit}</span></div></div>)}</div>}<button className="panel-bottom-link" onClick={() => setPage('Inventory')}>Manage inventory <ArrowRight size={15}/></button></section>
    </div>
    <div className="quick-actions"><div><div className="eyebrow">QUICK ACCESS</div><h3>What would you like to do?</h3></div><button onClick={onAddPatient}><span className="quick-icon quick-teal"><UserRound size={18}/></span><span><b>Register patient</b><small>Create a patient record</small></span><ChevronRight size={17}/></button><button onClick={onAddAppointment}><span className="quick-icon quick-blue"><CalendarDays size={18}/></span><span><b>Schedule appointment</b><small>Book a patient visit</small></span><ChevronRight size={17}/></button><button onClick={() => setPage('Clinical workspace')}><span className="quick-icon quick-purple"><ClipboardList size={18}/></span><span><b>Start consultation</b><small>Open clinical workspace</small></span><ChevronRight size={17}/></button><button onClick={() => setPage('Inventory')}><span className="quick-icon quick-orange"><Boxes size={18}/></span><span><b>Track inventory</b><small>Review stock levels</small></span><ChevronRight size={17}/></button></div>
  </>
}
function StatCard({ icon: Icon, label, value, delta, caption, tone, trend }: { icon: LucideIcon; label: string; value: string; delta: string; caption: string; tone: string; trend: string }) {
  return <div className="stat-card"><div className="stat-top"><span className={`stat-icon stat-${tone}`}><Icon size={19}/></span><button className="icon-button subtle" aria-label={`${label} options`}><MoreHorizontal size={18}/></button></div><span className="stat-label">{label}</span><b className="stat-value">{value}</b><div className="stat-foot"><span className={`stat-delta ${trend}`}><ArrowUpRight size={14}/>{delta}</span><span>{caption}</span></div></div>
}
function PatientsPage({ patients, total, filter, setFilter, onAdd, onView }: { patients: Patient[]; total: number; filter: string; setFilter: (v: string) => void; onAdd: () => void; onView: (p: Patient) => void }) {
  return <><PageHeading eyebrow="PATIENT MANAGEMENT" title="Patients" description="Manage patient records, contact details and visit history." action={<button className="btn btn-primary" onClick={onAdd}><Plus size={17}/> Register patient</button>}/><div className="summary-strip"><div><span className="summary-icon"><Users size={18}/></span><div><small>Total registered patients</small><b>{total.toLocaleString()}</b></div></div><div><span className="summary-icon summary-blue"><UserRound size={18}/></span><div><small>New registrations</small><b>18 <em>this week</em></b></div></div><div><span className="summary-icon summary-orange"><Clock3 size={18}/></span><div><small>Follow-ups</small><b>26 <em>scheduled</em></b></div></div></div><section className="panel table-panel"><div className="panel-header"><div><h3>Patient directory</h3><p>Search and manage registered patients</p></div><div className="table-tools"><label className="select-with-icon"><Filter size={15}/><select value={filter} onChange={e => setFilter(e.target.value)}><option>All patients</option><option>Active</option><option>Follow-up</option><option>New</option></select></label><button className="btn btn-light btn-sm"><Download size={15}/> Export</button></div></div><div className="table-wrap"><table><thead><tr><th>Patient</th><th>Patient ID</th><th>Age / Sex</th><th>Phone number</th><th>Last visit</th><th>Status</th><th></th></tr></thead><tbody>{patients.map(p => <tr key={p.id}><td><div className="table-person"><div className={`avatar avatar-${p.sex === 'Female' ? 'mint' : 'blue'}`}>{initials(p.name)}</div><div><b>{p.name}</b><small>Blood group: {p.bloodGroup}</small></div></div></td><td><span className="table-id">{p.code}</span></td><td>{p.age} yrs <span className="muted">/ {p.sex}</span></td><td>{p.phone}</td><td>{p.lastVisit}</td><td><span className={`badge ${p.status === 'Active' ? 'badge-success' : p.status === 'New' ? 'badge-info' : 'badge-warning'}`}>{p.status}</span></td><td><button className="icon-button" onClick={() => onView(p)} aria-label={`View ${p.name}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table>{patients.length === 0 && <div className="empty-table"><Search size={24}/><b>No matching patients</b><span>Try changing your search or filter.</span></div>}</div><div className="table-pagination"><span>Showing <b>{patients.length}</b> of <b>{total}</b> patients <em>· Demo records</em></span><div><button className="btn btn-light btn-sm" disabled><ChevronLeft size={15}/> Previous</button><button className="btn btn-light btn-sm" disabled>Next <ChevronRight size={15}/></button></div></div></section><div className="notice-inline"><ShieldCheck size={16}/> Patient records shown here are sample/demo data. Use the future authenticated Django API for real patient information.</div></>
}
function InventoryPage({ items, filter, setFilter, onAdd, onAdjust }: { items: InventoryItem[]; filter: string; setFilter: (v: string) => void; onAdd: () => void; onAdjust: (id: string) => void }) {
  const low = items.filter(i => i.quantity <= i.reorderAt).length
  const value = items.reduce((sum, i) => sum + i.quantity * i.price, 0)
  return <><PageHeading eyebrow="STOCK & SUPPLIES" title="Inventory management" description="Monitor stock on hand, reorder levels, item locations and stock movement." action={<><button className="btn btn-light" onClick={() => window.print()}><Download size={16}/> Export / Print</button><button className="btn btn-primary" onClick={onAdd}><Plus size={17}/> Add item</button></>}/><div className="stats-grid inventory-stats"><StatCard icon={Package} label="Catalogue items" value={String(items.length)} delta="Across categories" caption="Medicines & supplies" tone="teal" trend="up"/><StatCard icon={AlertTriangle} label="Low stock items" value={String(low)} delta={low ? 'Action required' : 'No action needed'} caption="At or below reorder level" tone="orange" trend="up"/><StatCard icon={Boxes} label="Units in stock" value={items.reduce((sum, i) => sum + i.quantity, 0).toLocaleString()} delta="All item quantities" caption="Across current catalogue" tone="blue" trend="up"/><StatCard icon={Wallet} label="Estimated stock value" value={money(value)} delta="Indicative only" caption="Based on demo unit prices" tone="purple" trend="up"/></div><section className="panel table-panel"><div className="panel-header"><div><h3>Inventory catalogue</h3><p>Track quantities and manage stock levels</p></div><div className="table-tools"><label className="select-with-icon"><SlidersHorizontal size={15}/><select value={filter} onChange={e => setFilter(e.target.value)}><option>All categories</option><option>Medicine</option><option>Consumable</option><option>Diagnostic</option><option>Equipment</option></select></label><button className="btn btn-light btn-sm" onClick={() => onAdjust(items[0]?.id)} disabled={!items.length}><Plus size={15}/> Quick adjustment</button></div></div><div className="table-wrap"><table><thead><tr><th>Item / SKU</th><th>Category</th><th>On hand</th><th>Reorder level</th><th>Unit price</th><th>Location</th><th>Stock status</th><th></th></tr></thead><tbody>{items.map(item => { const isLow = item.quantity <= item.reorderAt; return <tr key={item.id}><td><div className="table-person"><div className="product-icon"><Package size={17}/></div><div><b>{item.name}</b><small>{item.sku}</small></div></div></td><td><span className="category-pill">{item.category}</span></td><td><b className={isLow ? 'text-warning' : ''}>{item.quantity}</b> <span className="muted">{item.unit}</span></td><td>{item.reorderAt} <span className="muted">{item.unit}</span></td><td>{item.price ? money(item.price) : '—'}</td><td>{item.location}</td><td><span className={`badge ${isLow ? 'badge-warning' : 'badge-success'}`}>{isLow ? 'Reorder' : 'In stock'}</span></td><td><button className="icon-button" onClick={() => onAdjust(item.id)} aria-label={`Adjust ${item.name}`}><MoreHorizontal size={18}/></button></td></tr>})}</tbody></table>{items.length === 0 && <div className="empty-table"><Package size={24}/><b>No matching items</b><span>Try another search or category.</span></div>}</div><div className="table-pagination"><span>Showing <b>{items.length}</b> catalogue items <em>· In-memory demo</em></span><div><button className="btn btn-light btn-sm" disabled><ChevronLeft size={15}/> Previous</button><button className="btn btn-light btn-sm" disabled>Next <ChevronRight size={15}/></button></div></div></section><div className="notice-inline"><AlertTriangle size={16}/> Before production use, inventory needs server-side stock transactions, lot/batch and expiry tracking, permissions and audit trails.</div></>
}
function AppointmentsPage({ onAdd }: { onAdd: () => void }) {
  return <><PageHeading eyebrow="SCHEDULING" title="Appointments" description="Coordinate visits, check-in status and clinician schedules." action={<button className="btn btn-primary" onClick={onAdd}><Plus size={17}/> New appointment</button>}/><div className="summary-strip"><div><span className="summary-icon"><CalendarDays size={18}/></span><div><small>Scheduled today</small><b>24</b></div></div><div><span className="summary-icon summary-blue"><CheckCircle2 size={18}/></span><div><small>Checked in</small><b>12</b></div></div><div><span className="summary-icon summary-orange"><Clock3 size={18}/></span><div><small>Waiting</small><b>6</b></div></div></div><section className="panel"><div className="panel-header"><div><h3>Friday, 9 October 2026</h3><p>Daily appointment schedule · Sample entries</p></div><div className="date-control"><button className="icon-button"><ChevronLeft size={17}/></button><button className="btn btn-light btn-sm"><CalendarDays size={15}/> Today</button><button className="icon-button"><ChevronRight size={17}/></button></div></div><div className="schedule-list">{appointments.concat([{time:'11:00 AM',name:'Ngozi Adeyemi',type:'General consultation',clinician:'Dr. M. Eze',status:'Waiting',initials:'NA',color:'lilac'}]).map((a, i) => <div className="schedule-row" key={a.name}><div className="schedule-time"><b>{a.time}</b><span>{i % 2 === 0 ? '30 min' : '20 min'}</span></div><div className="schedule-line"><i/></div><div className={`avatar avatar-${a.color}`}>{a.initials}</div><div className="appointment-info"><b>{a.name}</b><span>{a.type} · {a.clinician}</span></div><span className={`status status-${a.status.toLowerCase().replace(' ', '-')}`}>{a.status}</span><button className="btn btn-light btn-sm" onClick={() => window.alert('Appointment actions will be connected to the Django API in a later phase.')}>View details</button></div>)}</div></section><div className="notice-inline"><ShieldCheck size={16}/> Appointment actions are visual placeholders; records are not persisted.</div></>
}
function ModulePage({ title, eyebrow, description, icon: Icon, stats, sections, notify }: { title: string; eyebrow: string; description: string; icon: LucideIcon; stats: [string, string][]; sections: string[]; notify: (m: string) => void }) {
  return <><PageHeading eyebrow={eyebrow} title={title} description={description} action={<button className="btn btn-primary" onClick={() => notify(`${title}: create workflow will be connected to Django later.`)}><Plus size={17}/> New record</button>}/><div className="stats-grid module-stats">{stats.map((s, i) => <div className="stat-card" key={s[0]}><div className="stat-top"><span className={`stat-icon ${['stat-teal','stat-blue','stat-orange'][i]}`}><Icon size={19}/></span><span className="tiny-label">TODAY</span></div><span className="stat-label">{s[0]}</span><b className="stat-value">{s[1]}</b><div className="stat-foot"><span className="muted">Demo indicator</span></div></div>)}</div><div className="module-layout"><section className="panel module-workspace"><div className="panel-header"><div><h3>{title} workspace</h3><p>Select a workflow to begin</p></div><span className="badge badge-info">Frontend preview</span></div><div className="workflow-grid">{sections.map((s, i) => <button className="workflow-card" key={s} onClick={() => notify(`${s} is a frontend placeholder awaiting Django API integration.`)}><span className={`workflow-icon workflow-${i % 4}`}><Icon size={20}/></span><b>{s}</b><span>Open workspace <ArrowRight size={14}/></span></button>)}</div></section><section className="panel module-side"><div className="panel-header"><div><h3>Recent activity</h3><p>Example workflow events</p></div></div><div className="activity-list"><div className="activity-item"><span className="activity-mark mark-teal"><Check size={13}/></span><div><b>Workspace ready</b><p>The module interface is available.</p><small>Today, 09:00 AM</small></div></div><div className="activity-item"><span className="activity-mark mark-blue"><ClipboardList size={13}/></span><div><b>Sample queue loaded</b><p>Demonstration indicators are shown.</p><small>Today, 08:45 AM</small></div></div><div className="activity-item"><span className="activity-mark mark-orange"><ShieldCheck size={13}/></span><div><b>API integration pending</b><p>No live clinical records are connected.</p><small>Phase 2</small></div></div></div></section></div><div className="notice-inline"><ShieldCheck size={16}/> This module is a user-interface prototype. Validate workflows with clinical stakeholders before connecting production data.</div></>
}
function ReportsPage({ notify }: { notify: (m: string) => void }) {
  return <><PageHeading eyebrow="INSIGHTS & PERFORMANCE" title="Reports & analytics" description="Review service activity, patient trends and operational indicators." action={<button className="btn btn-primary" onClick={() => notify('Report export will be connected after the reporting API is implemented.')}><Download size={16}/> Export report</button>}/><div className="stats-grid"><StatCard icon={Users} label="Patients seen" value="386" delta="+9.3%" caption="This month" tone="teal" trend="up"/><StatCard icon={CalendarCheck} label="Visit completion" value="92.4%" delta="+2.1%" caption="vs. previous month" tone="blue" trend="up"/><StatCard icon={Wallet} label="Revenue" value={money(4826500)} delta="+7.8%" caption="This month" tone="purple" trend="up"/><StatCard icon={Activity} label="Service utilisation" value="78%" delta="Within target" caption="Monthly estimate" tone="orange" trend="up"/></div><div className="report-grid"><section className="panel chart-panel"><div className="panel-header"><div><h3>Clinic visits</h3><p>Weekly patient visits · illustrative data</p></div><select className="simple-select"><option>Last 7 days</option><option>This month</option></select></div><div className="chart-legend"><span><i className="legend-dot teal-dot"/> Outpatient</span><span><i className="legend-dot blue-dot"/> Maternal care</span></div><div className="bar-chart">{[['Mon',38,20],['Tue',56,32],['Wed',46,27],['Thu',73,38],['Fri',63,33],['Sat',35,19],['Sun',22,12]].map(([day,a,b]) => <div className="bar-group" key={String(day)}><div className="bars"><i className="bar bar-teal" style={{height:`${a}%`}}/><i className="bar bar-blue" style={{height:`${b}%`}}/></div><span>{day}</span></div>)}</div></section><section className="panel service-panel"><div className="panel-header"><div><h3>Services overview</h3><p>Distribution of visits</p></div></div>{[['Outpatient',62,'62%'],['Maternal care',21,'21%'],['Laboratory',11,'11%'],['Family planning',6,'6%']].map(([name,pct,label]) => <div className="service-progress" key={String(name)}><div><span>{name}</span><b>{label}</b></div><div className="progress-track"><i style={{width:`${pct}%`}}/></div></div>)}</section></div><div className="notice-inline"><FileBarChart size={16}/> Analytics values are illustrative, not calculated from live records.</div></>
}
function StaffPage({ notify }: { notify: (m: string) => void }) {
  const staff = [{name:'Dr. Ada Okoro',role:'Medical Officer',dept:'Clinical services',status:'On duty',initials:'AO',tone:'mint'},{name:'Nurse Ifeoma Musa',role:'Nurse / Midwife',dept:'Maternal care',status:'On duty',initials:'IM',tone:'blue'},{name:'Dr. Michael Eze',role:'Medical Officer',dept:'Outpatient',status:'On duty',initials:'ME',tone:'lilac'},{name:'Chika Nnamdi',role:'Laboratory Scientist',dept:'Laboratory',status:'Off duty',initials:'CN',tone:'peach'}]
  return <><PageHeading eyebrow="PEOPLE & ACCESS" title="Staff directory" description="View team members, departments and current duty status." action={<button className="btn btn-primary" onClick={() => notify('Staff creation will be connected to Django user management later.')}><Plus size={17}/> Add staff member</button>}/><div className="summary-strip"><div><span className="summary-icon"><Users size={18}/></span><div><small>Total team members</small><b>18</b></div></div><div><span className="summary-icon summary-blue"><CheckCircle2 size={18}/></span><div><small>On duty today</small><b>12</b></div></div><div><span className="summary-icon summary-orange"><ShieldCheck size={18}/></span><div><small>Access roles</small><b>5</b></div></div></div><div className="staff-grid">{staff.map(s => <div className="panel staff-card" key={s.name}><div className="staff-card-top"><div className={`avatar avatar-${s.tone} avatar-large`}>{s.initials}</div><button className="icon-button" onClick={() => notify(`Staff profile preview: ${s.name}`)}><MoreHorizontal size={18}/></button></div><h3>{s.name}</h3><p>{s.role}</p><span className="staff-dept">{s.dept}</span><div className="staff-card-bottom"><span className={`staff-status ${s.status === 'On duty' ? 'on-duty' : ''}`}><i/>{s.status}</span><button className="text-button" onClick={() => notify('Staff details are demo-only.')}>View profile <ArrowRight size={14}/></button></div></div>)}</div><div className="notice-inline"><ShieldCheck size={16}/> User accounts, permissions and staff records must be managed securely by Django.</div></>
}
function SettingsPage({ notify }: { notify: (m: string) => void }) {
  const [tab, setTab] = useState('Organisation')
  return <><PageHeading eyebrow="CONFIGURATION" title="Settings" description="Configure organisation details, workflows and application preferences."/><div className="settings-layout"><div className="panel settings-nav">{['Organisation','Users & roles','Clinical workflows','Notifications','Data & privacy','Integrations'].map((t,i) => <button key={t} className={tab === t ? 'settings-nav-active' : ''} onClick={() => setTab(t)}>{[Building2,Users,ClipboardList,Bell,ShieldCheck,Activity].map((I,j) => i===j ? <I size={17} key={j}/> : null)}<span>{t}</span><ChevronRight size={15}/></button>)}</div><section className="panel settings-content"><div className="panel-header"><div><h3>{tab}</h3><p>Manage {tab.toLowerCase()} preferences for your workspace.</p></div><span className="badge badge-info">Preview</span></div>{tab === 'Organisation' ? <div className="settings-form"><label>Organisation name<input defaultValue="MaCoKi Health Centre"/></label><div className="form-grid"><label>Facility type<select defaultValue="Primary healthcare centre"><option>Primary healthcare centre</option><option>Private clinic</option><option>Hospital</option><option>Community health centre</option></select></label><label>Country<select defaultValue="Nigeria"><option>Nigeria</option><option>Ghana</option><option>Other</option></select></label></div><label>Contact email<input defaultValue="admin@example.org"/></label><label>Address<textarea defaultValue="Clinic address to be configured" rows={3}/></label><div className="notice-box"><ShieldCheck size={17}/><span>These values are local form defaults only. Saving to an organisation record requires the Django API.</span></div></div> : <div className="settings-placeholder"><span className="settings-placeholder-icon"><Settings size={24}/></span><h3>{tab} configuration</h3><p>This settings section is laid out for Phase 1. Secure server-side configuration and permission checks will be added with Django.</p></div>}<div className="settings-actions"><button className="btn btn-light" onClick={() => notify('No settings were changed.')}>Cancel</button><button className="btn btn-primary" onClick={() => notify(`${tab} settings are not persisted in this frontend demo.`)}>Save changes</button></div></section></div><div className="notice-inline"><ShieldCheck size={16}/> Settings are not persisted. Do not enter real secrets or sensitive patient information into this demo.</div></>
}
