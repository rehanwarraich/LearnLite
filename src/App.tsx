import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CloudOff,
  CloudSun,
  Database,
  Download,
  Gauge,
  GraduationCap,
  HardDrive,
  LayoutDashboard,
  Library,
  ListChecks,
  Menu,
  MoreHorizontal,
  Pause,
  RefreshCw,
  Search,
  Settings,
  Signal,
  SlidersHorizontal,
  Sparkles,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import type { ConnectionStatus, ContentType, LocalContent, Resource } from '@/types';
import { useAppData } from '@/hooks/useAppData';
import { rankAllResources, selectVersion } from '@/lib/priorityEngine';
import { LessonViewer } from '@/components/LessonViewer';
import { QuizViewer } from '@/components/QuizViewer';

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatBudget = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const subjectColors: Record<string, string> = {
  Mathematics: 'coral',
  Physics: 'blue',
  'Computer Science': 'teal',
  Biology: 'green',
  Chemistry: 'amber',
  English: 'rose',
};

const contentIcons: Record<ContentType, string> = {
  text: 'TXT',
  pdf: 'PDF',
  image: 'IMG',
  quiz: 'QUIZ',
  practice: 'SET',
};

function App() {
  const data = useAppData();
  const [page, setPage] = useState('dashboard');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (nextPage: string) => {
    setPage(nextPage);
    setSelectedResource(null);
    setMobileOpen(false);
  };

  if (!data.isReady || !data.settings) {
    return <LoadingScreen />;
  }

  const openResource = (resource: Resource) => {
    setSelectedResource(resource);
    setPage('resource');
  };

  const openViewer = (resource: Resource) => {
    setSelectedResource(resource);
    setPage('viewer');
  };

  const pageContent = selectedResource && page === 'viewer' ? (
    <ResourceViewer
      resource={selectedResource}
      data={data}
      onBack={() => navigate(selectedResource ? 'library' : 'learning')}
    />
  ) : selectedResource ? (
    <ResourceDetail
      resource={selectedResource}
      data={data}
      onBack={() => navigate('library')}
      onLearn={() => openViewer(selectedResource)}
    />
  ) : page === 'dashboard' ? (
    <Dashboard data={data} onNavigate={navigate} onOpenResource={openResource} />
  ) : page === 'library' ? (
    <LibraryPage data={data} onOpenResource={openResource} />
  ) : page === 'sync' ? (
    <SyncCenter data={data} onNavigate={navigate} />
  ) : page === 'learning' ? (
    <LearningPage data={data} onOpenResource={openViewer} />
  ) : (
    <SettingsPage data={data} />
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={24} /></div>
          <div><strong>LearnLite</strong><span>Learning, uninterrupted.</span></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="nav-label">Workspace</div>
        <nav>
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={page === 'dashboard'} onClick={() => navigate('dashboard')} />
          <NavItem icon={<Library size={18} />} label="Resource library" active={page === 'library' || page === 'resource' || page === 'viewer'} onClick={() => navigate('library')} />
          <NavItem icon={<BookOpen size={18} />} label="Offline learning" active={page === 'learning'} onClick={() => navigate('learning')} badge={data.resources.filter((r) => r.available_offline).length || undefined} />
          <NavItem icon={<RefreshCw size={18} />} label="Sync center" active={page === 'sync'} onClick={() => navigate('sync')} badge={data.syncQueue.filter((op) => op.status === 'pending' || op.status === 'paused' || op.status === 'blocked').length || undefined} />
        </nav>
        <div className="nav-label nav-label-lower">Manage</div>
        <nav><NavItem icon={<Settings size={18} />} label="Preferences" active={page === 'settings'} onClick={() => navigate('settings')} /></nav>
        <div className="sidebar-bottom">
          <ConnectionMini status={data.connection} />
          <div className="user-card"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><span>Student account</span></div><MoreHorizontal size={18} /></div>
        </div>
      </aside>
      {mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{page === 'dashboard' ? 'Overview' : page === 'resource' ? 'Resource details' : page === 'viewer' ? 'Learning' : page === 'settings' ? 'Preferences' : page === 'sync' ? 'Sync center' : page === 'learning' ? 'Offline learning' : 'Resource library'}</strong></div>
          <div className="topbar-actions"><div className="topbar-search"><Search size={16} /><span>Search resources</span><kbd>⌘ K</kbd></div><button className="icon-button"><Activity size={18} /></button><div className="top-avatar">AM</div></div>
        </header>
        <div className="page-container">{pageContent}</div>
      </main>
    </div>
  );
}

function LoadingScreen() { return <div className="loading-screen"><div className="loading-mark"><GraduationCap size={28} /></div><strong>Preparing your learning space</strong><span>Loading local resources…</span></div>; }

function NavItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number }) {
  return <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span>{badge ? <em>{badge}</em> : null}</button>;
}

function ConnectionMini({ status }: { status: ConnectionStatus }) {
  const labels: Record<ConnectionStatus, string> = { connected: 'Connected', weak: 'Weak connection', intermittent: 'Intermittent', offline: 'Offline mode' };
  return <div className={`connection-mini ${status}`}><span className="status-dot" /><div><strong>{labels[status]}</strong><span>{status === 'offline' ? 'Studying locally' : 'Sync ready'}</span></div><Signal size={16} /></div>;
}

function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function StatusBanner({ data }: { data: ReturnType<typeof useAppData> }) {
  const config = {
    connected: { icon: <Wifi size={18} />, title: 'Connected and ready to sync', text: 'Your connection is strong enough for efficient downloads.', tone: 'success' },
    weak: { icon: <Signal size={18} />, title: 'Weak connection detected', text: 'We’ll prioritize small, high-value resources first.', tone: 'warning' },
    intermittent: { icon: <RefreshCw size={18} />, title: 'Intermittent connection', text: 'Downloads pause safely and resume when connectivity returns.', tone: 'warning' },
    offline: { icon: <CloudOff size={18} />, title: 'You’re studying offline', text: 'Your downloaded resources are ready. Progress is saved locally.', tone: 'offline' },
  }[data.connection];
  return <div className={`status-banner ${config.tone}`}><div className="banner-icon">{config.icon}</div><div><strong>{config.title}</strong><span>{config.text}</span></div><div className="banner-right"><span className="live-dot" /> Live status</div></div>;
}

function Dashboard({ data, onNavigate, onOpenResource }: { data: ReturnType<typeof useAppData>; onNavigate: (page: string) => void; onOpenResource: (resource: Resource) => void }) {
  const downloaded = data.resources.filter((r) => r.available_offline).length;
  const pending = data.syncQueue.filter((op) => op.status === 'pending' || op.status === 'paused' || op.status === 'in_progress').length;
  const completed = data.progress.filter((p) => p.status === 'completed').length;
  const usage = data.actualUsage;
  const { selected } = rankAllResources(data.resources, data.settings!, data.connection, Math.max(0, data.settings!.data_budget_bytes - usage), new Set(data.resources.filter((r) => r.available_offline).map((r) => r.resource_id)));
  const recommendations = selected.slice(0, 3);
  return <>
    <PageTitle eyebrow="Wednesday, September 19, 2026" title="Make every megabyte count." description="Your learning space is ready for whatever the network brings today." action={<button className="primary-button" onClick={() => void data.sync()}><RefreshCw size={16} /> Sync now</button>} />
    <StatusBanner data={data} />
    {data.syncEvent.type === 'budget_exhausted' && <div className="notice warning"><Database size={17} /><span>{data.syncEvent.message ?? 'Data budget exhausted. Downloads are paused until you increase your budget.'}</span></div>}
    <div className="stat-grid">
      <StatCard icon={<Database size={19} />} label="Data remaining" value={formatBudget(Math.max(0, data.settings!.data_budget_bytes - usage))} detail={`${formatBudget(usage)} used of ${formatBudget(data.settings!.data_budget_bytes)}`} tone="coral" progress={(Math.max(0, data.settings!.data_budget_bytes - usage) / data.settings!.data_budget_bytes) * 100} />
      <StatCard icon={<HardDrive size={19} />} label="Available offline" value={String(downloaded)} detail={`of ${data.resources.length} resources`} tone="blue" />
      <StatCard icon={<RefreshCw size={19} />} label="Pending sync" value={String(pending)} detail={pending ? 'Waiting for connection' : 'All caught up'} tone="teal" />
      <StatCard icon={<CheckCircle2 size={19} />} label="Lessons completed" value={String(completed)} detail="Saved on this device" tone="amber" />
    </div>
    <div className="dashboard-grid">
      <section className="panel recommendations-panel"><div className="panel-heading"><div><div className="eyebrow">Priority queue</div><h2>Best use of your data</h2></div><button className="text-button" onClick={() => onNavigate('library')}>View library <ArrowDownToLine size={14} /></button></div><p className="panel-intro">Based on your subjects, urgency, expected use, and current connection.</p><div className="recommendation-list">{recommendations.map((item, index) => <Recommendation key={item.resource.resource_id} item={item} index={index} onOpen={() => onOpenResource(item.resource)} />)}{recommendations.length === 0 && <EmptyState title="Your offline collection is complete" text="There are no more resources that fit the current budget." />}</div><div className="data-note"><Zap size={16} /><span>Selections maximize learning value, not just download order.</span></div></section>
      <section className="panel activity-panel"><div className="panel-heading"><div><div className="eyebrow">Your recent work</div><h2>Learning activity</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div>{data.progress.length === 0 ? <div className="activity-empty"><div className="empty-icon"><BookOpen size={22} /></div><strong>No activity yet</strong><span>Open an offline lesson to start building your learning history.</span><button className="secondary-button" onClick={() => onNavigate('learning')}>Browse offline lessons</button></div> : <div className="activity-list">{data.progress.slice(-4).reverse().map((item) => <ActivityRow key={item.id} item={item} />)}</div>}<button className="panel-footer-link" onClick={() => onNavigate('learning')}>Open offline learning <ChevronRight size={15} /></button></section>
    </div>
    <div className="dashboard-lower"><section className="panel how-panel"><div className="panel-heading"><div><div className="eyebrow">How LearnLite works</div><h2>Learning that adapts to the network</h2></div></div><div className="steps"><Step number="01" icon={<Gauge size={18} />} title="Measure" text="We watch your connection and data budget." /><Step number="02" icon={<SlidersHorizontal size={18} />} title="Prioritize" text="A value score finds the best resource mix." /><Step number="03" icon={<CloudSun size={18} />} title="Prepare" text="Download now, continue learning offline." /></div></section><section className="quote-card"><Sparkles size={22} /><p>“Use your limited data where it provides the most learning value.”</p><span>LearnLite principle</span></section></div>
  </>;
}

function StatCard({ icon, label, value, detail, tone, progress }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: string; progress?: number }) { return <div className={`stat-card ${tone}`}><div className="stat-icon">{icon}</div><div className="stat-label">{label}</div><strong>{value}</strong><span>{detail}</span>{progress !== undefined && <div className="mini-progress"><i style={{ width: `${progress}%` }} /></div>}</div>; }

function Recommendation({ item, index, onOpen }: { item: { resource: Resource; score: number; selectedVersion: { size_bytes: number }; factors: { studentPreference: number } }; index: number; onOpen: () => void }) { const color = subjectColors[item.resource.subject] ?? 'blue'; return <button className="recommendation" onClick={onOpen}><div className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</div><div className={`subject-icon ${color}`}>{contentIcons[item.resource.content_type]}</div><div className="recommendation-main"><strong>{item.resource.title}</strong><span>{item.resource.subject} <b>·</b> {formatBytes(item.selectedVersion.size_bytes)} <b>·</b> {item.factors.studentPreference === 1 ? 'Preferred subject' : 'Good fit'}</span></div><div className="score-pill"><Zap size={12} /> {Math.round(item.score * 100)}%</div><ChevronRight size={17} className="row-chevron" /></button>; }

function ActivityRow({ item }: { item: { resource_title: string; status: string; score?: number; synced: boolean } }) { return <div className="activity-row"><div className="activity-check"><Check size={14} /></div><div><strong>{item.resource_title}</strong><span>{item.status === 'completed' ? `Completed${item.score !== undefined ? ` · ${item.score}% score` : ''}` : 'In progress'}</span></div><span className={`sync-label ${item.synced ? 'synced' : ''}`}>{item.synced ? 'Synced' : 'Pending'}</span></div>; }
function Step({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) { return <div className="step"><span>{number}</span><div className="step-icon">{icon}</div><strong>{title}</strong><p>{text}</p></div>; }
function EmptyState({ title, text }: { title: string; text: string }) { return <div className="empty-state"><CheckCircle2 size={20} /><strong>{title}</strong><span>{text}</span></div>; }

function LibraryPage({ data, onOpenResource }: { data: ReturnType<typeof useAppData>; onOpenResource: (resource: Resource) => void }) {
  const [filter, setFilter] = useState('All resources'); const [search, setSearch] = useState('');
  const filtered = data.resources.filter((r) => (filter === 'All resources' || r.subject === filter || (filter === 'Offline' && r.available_offline)) && r.title.toLowerCase().includes(search.toLowerCase()));
  const subjects = ['All resources', 'Offline', ...Array.from(new Set(data.resources.map((r) => r.subject)))];
  return <><PageTitle eyebrow="Knowledge base" title="Resource library" description="A focused collection, ready to be prioritized for your next connection." action={<button className="secondary-button" onClick={() => void data.sync()}><RefreshCw size={16} /> Run prioritization</button>} /><div className="library-toolbar"><div className="filter-tabs">{subjects.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}{item === 'Offline' && <span>{data.resources.filter((r) => r.available_offline).length}</span>}</button>)}</div><div className="inline-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter resources…" /></div></div><div className="resource-grid">{filtered.map((resource) => <ResourceCard key={resource.resource_id} resource={resource} onOpen={() => onOpenResource(resource)} download={data.downloads.find((d) => d.resource_id === resource.resource_id && d.status === 'completed')} />)}</div></>;
}

function ResourceCard({ resource, onOpen, download }: { resource: Resource; onOpen: () => void; download?: { version: string; version_size_bytes: number } }) { const color = subjectColors[resource.subject] ?? 'blue'; return <button className="resource-card" onClick={onOpen}><div className={`resource-card-top ${color}`}><span>{resource.subject}</span><span className="type-badge">{contentIcons[resource.content_type]}</span></div><div className="resource-card-body"><div className="resource-title-row"><h3>{resource.title}</h3>{resource.available_offline ? <CheckCircle2 size={17} className="offline-check" /> : <Download size={16} className="download-icon" />}</div><p>{resource.description}</p><div className="resource-card-meta"><span>{formatBytes(resource.estimated_download_size)}</span><span className="meta-dot" /><span className={`priority-text ${resource.importance}`}>{resource.importance} priority</span>{download?.version && <><span className="meta-dot" /><span className="version-indicator">{download.version}</span></>}<ChevronRight size={16} /></div></div></button>; }

function ResourceDetail({ resource, data, onBack, onLearn }: { resource: Resource; data: ReturnType<typeof useAppData>; onBack: () => void; onLearn: () => void }) {
  const download = data.downloads.find((d) => d.resource_id === resource.resource_id);
  const progress = download?.progress ?? 0;
  const completed = data.progress.some((item) => item.resource_id === resource.resource_id && item.status === 'completed');
  const [hasLocalContent, setHasLocalContent] = useState(false);
  useEffect(() => {
    let active = true;
    void data.getLocalContent(resource.resource_id).then((local) => { if (active) setHasLocalContent(!!local); });
    return () => { active = false; };
  }, [resource.resource_id, data.downloads]);

  const remainingBudget = data.settings ? Math.max(0, data.settings.data_budget_bytes - data.actualUsage) : 0;
  const recommended = selectVersion(resource, data.connection, remainingBudget);
  const downloadedVersion = download?.version;

  return <><button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back to library</button><div className="detail-layout"><article className="detail-main"><div className={`detail-hero ${subjectColors[resource.subject] ?? 'blue'}`}><span>{resource.subject}</span><div className="hero-type">{contentIcons[resource.content_type]}</div></div><div className="detail-content"><div className="eyebrow">{resource.content_type} lesson</div><h1>{resource.title}</h1><p className="detail-description">{resource.description}</p><div className="detail-actions">{hasLocalContent ? <button className="primary-button" onClick={onLearn}><BookOpen size={16} /> Open offline</button> : <button className="primary-button" onClick={() => void data.downloadResource(resource)} disabled={data.connection === 'offline' || progress > 0 && progress < 100 || !recommended}>{progress > 0 && progress < 100 ? <><Pause size={16} /> Downloading {progress}%</> : !recommended ? <><Download size={16} /> No version fits budget</> : <><Download size={16} /> Download{recommended ? ` ${recommended.version_label}` : ''}</>}</button>}<button className="secondary-button" onClick={() => void data.saveLearningProgress({ resource_id: resource.resource_id, resource_title: resource.title, status: 'completed' })} disabled={!hasLocalContent || completed}><ListChecks size={16} /> {completed ? 'Completed offline' : 'Mark complete'}</button></div>{progress > 0 && progress < 100 && <div className="detail-download"><div><span>Preparing offline copy{download?.version && ` · ${download.version}`}</span><strong>{progress}%</strong></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div><small>{data.connection === 'offline' ? 'Paused — will resume when connection returns' : 'Download in progress'}</small></div>}<div className="content-preview"><div className="preview-heading"><BookOpen size={17} /><strong>About this resource</strong></div>{resource.content.split('\n').slice(0, 8).map((line, index) => line.startsWith('#') ? <h3 key={index}>{line.replace(/^#+\s*/, '')}</h3> : <p key={index}>{line || '\u00a0'}</p>)}</div></div></article><aside className="detail-sidebar"><div className="panel"><div className="eyebrow">Resource profile</div><div className="profile-list"><ProfileItem label="Estimated size" value={formatBytes(resource.estimated_download_size)} /><ProfileItem label="Importance" value={resource.importance} accent={resource.importance === 'critical' ? 'coral' : undefined} /><ProfileItem label="Urgency" value={resource.urgency} /><ProfileItem label="Expected use" value={`${Math.round(resource.estimated_usage * 100)}%`} /><ProfileItem label="Prerequisite" value={resource.prerequisite_level} /></div></div><div className="panel version-panel"><div className="eyebrow">Available versions</div>{resource.versions.map((version) => { const fits = version.size_bytes <= remainingBudget; const isRecommended = recommended?.version_label === version.version_label; const isDownloaded = downloadedVersion === version.version_label; return <div className={`version-row ${isRecommended ? 'recommended' : ''} ${isDownloaded ? 'downloaded' : ''}`} key={version.id}><div className="version-info"><div className="version-label-row"><strong>{version.version_label}</strong>{isRecommended && <span className="version-badge">Recommended</span>}{isDownloaded && <span className="version-badge downloaded-badge"><CheckCircle2 size={11} /> Downloaded</span>}</div><span className="version-desc">{version.description}</span><b className="version-size">{formatBytes(version.size_bytes)}</b></div>{!hasLocalContent && !isDownloaded && <button className={`version-select-btn ${!fits ? 'disabled' : ''}`} disabled={!fits || progress > 0} onClick={() => void data.downloadResourceVersion(resource, version.version_label)}>{!fits ? 'Too large' : 'Select'}</button>}{isDownloaded && <span className="version-current"><Check size={14} /> Current</span>}</div>; })}<div className="version-budget-info"><div className="budget-row"><span>Remaining data budget</span><strong>{formatBudget(remainingBudget)}</strong></div>{recommended ? <div className="budget-recommend"><Zap size={14} /> <span>Recommended: <strong>{recommended.version_label}</strong> ({formatBytes(recommended.size_bytes)})</span></div> : <div className="budget-recommend warning"><Database size={14} /> <span>No version fits your remaining budget. Increase your budget in Preferences.</span></div>}</div></div><div className="offline-tip"><Zap size={17} /><div><strong>Data-aware tip</strong><span>LearnLite selects the best version that fits your remaining data budget.</span></div></div></aside></div></>;
}
function ProfileItem({ label, value, accent }: { label: string; value: string; accent?: string }) { return <div className="profile-item"><span>{label}</span><strong className={accent ?? ''}>{value}</strong></div>; }

function SyncCenter({ data, onNavigate }: { data: ReturnType<typeof useAppData>; onNavigate: (page: string) => void }) { const active = data.syncEvent.resourceId ? data.resources.find((r) => r.resource_id === data.syncEvent.resourceId) : null; const pending = data.syncQueue.filter((op) => op.status !== 'completed'); const completed = data.syncQueue.filter((op) => op.status === 'completed'); return <><PageTitle eyebrow="Data operations" title="Sync center" description="See exactly what is moving, waiting, or safely paused." action={<button className="primary-button" onClick={() => void data.sync()} disabled={data.connection === 'offline'}><RefreshCw size={16} /> Sync queue</button>} />{data.syncEvent.type === 'budget_exhausted' && <div className="notice warning"><Database size={17} /><span>{data.syncEvent.message ?? 'Data budget exhausted. Downloads are paused until you increase your budget.'}</span></div>}{data.syncEvent.type === 'paused' && <div className="notice warning"><Pause size={17} /><span>{data.syncEvent.message ?? 'Sync paused until connectivity returns.'}</span></div>}{data.syncEvent.type === 'completed' && <div className="notice success"><CheckCircle2 size={17} /><span>{data.syncEvent.message ?? 'Everything is synchronized.'}</span></div>}<div className="sync-layout"><section className="panel current-sync"><div className="panel-heading"><div><div className="eyebrow">Now processing</div><h2>{active ? active.title : 'Queue is standing by'}</h2></div><div className={`sync-state ${data.syncEvent.type}`}>{data.syncEvent.type === 'progress' || data.syncEvent.type === 'started' ? <><span className="pulse-dot" /> Downloading</> : data.syncEvent.type === 'paused' ? <><Pause size={14} /> Paused</> : data.syncEvent.type === 'budget_exhausted' ? <><Database size={14} /> Budget exhausted</> : <><Check size={14} /> Ready</>}</div></div>{active ? <><div className="sync-resource"><div className={`subject-icon ${subjectColors[active.subject] ?? 'blue'}`}>{contentIcons[active.content_type]}</div><div><strong>{active.title}</strong><span>{active.subject} · {formatBytes(active.estimated_download_size)}</span></div><strong>{data.syncEvent.progress ?? 0}%</strong></div><div className="progress-track large"><i style={{ width: `${data.syncEvent.progress ?? 0}%` }} /></div><p className="sync-helper">{data.connection === 'offline' ? 'Connection lost. Your progress is safe and will continue later.' : data.syncEvent.type === 'budget_exhausted' ? 'Data budget exhausted. Increase your budget in Preferences to resume.' : 'Downloading in small chunks so an interruption never loses your work.'}</p></> : <div className="standby"><div className="standby-icon"><CloudSun size={25} /></div><strong>Ready for your next connection</strong><span>LearnLite will select the highest-value resources within your remaining budget.</span><button className="secondary-button" onClick={() => onNavigate('library')}>Review resources</button></div>}</section><section className="panel queue-panel"><div className="panel-heading"><div><div className="eyebrow">Local queue</div><h2>Waiting to sync <span className="heading-count">{pending.length}</span></h2></div></div>{pending.length === 0 ? <EmptyState title="All caught up" text="No downloads or learning progress are waiting." /> : <div className="queue-list">{pending.map((op) => <QueueRow key={op.id} op={op} resources={data.resources} />)}</div>}</section></div><section className="panel completed-panel"><div className="panel-heading"><div><div className="eyebrow">History</div><h2>Completed operations</h2></div><span className="history-count"><CheckCircle2 size={15} /> {completed.length} completed</span></div>{completed.slice(-5).reverse().map((op) => <QueueRow key={op.id} op={op} resources={data.resources} completed />)}{completed.length === 0 && <div className="empty-inline">Completed operations will appear here.</div>}</section></>; }
function QueueRow({ op, resources, completed = false }: { op: { type: string; resource_id?: string; status: string; progress: number; retry_count: number }; resources: Resource[]; completed?: boolean }) { const resource = resources.find((r) => r.resource_id === op.resource_id); return <div className="queue-row"><div className={`queue-icon ${completed ? 'done' : op.status === 'paused' ? 'paused' : op.status === 'blocked' ? 'paused' : ''}`}>{completed ? <Check size={15} /> : op.type === 'progress' ? <BookOpen size={15} /> : op.status === 'paused' || op.status === 'blocked' ? <Pause size={15} /> : <Download size={15} />}</div><div className="queue-row-main"><strong>{op.type === 'progress' ? 'Learning progress' : resource?.title ?? 'Resource download'}</strong><span>{op.type === 'progress' ? 'Progress update' : `${resource?.subject ?? 'Resource'} · ${resource ? formatBytes(resource.estimated_download_size) : ''}`}</span></div><span className={`queue-status ${completed ? 'complete' : op.status}`}>{completed ? 'Completed' : op.status === 'paused' ? 'Paused' : op.status === 'blocked' ? 'Blocked' : op.status === 'in_progress' ? `${op.progress}%` : 'Pending'}</span></div>; }

function LearningPage({ data, onOpenResource }: { data: ReturnType<typeof useAppData>; onOpenResource: (resource: Resource) => void }) { const offline = data.resources.filter((r) => r.available_offline); return <><PageTitle eyebrow="Your private study space" title="Offline learning" description="Everything here is stored on your device and works without a connection." action={<div className="offline-badge"><span className="status-dot" /> Local-first</div>} />{offline.length === 0 ? <div className="panel learning-empty"><div className="empty-icon large"><Download size={24} /></div><h2>Your offline shelf is empty</h2><p>Download a few high-value resources while you have a connection, then come back here to study anywhere.</p><button className="primary-button" onClick={() => onOpenResource(data.resources[0])}>Browse resource library</button></div> : <><div className="learning-summary"><div><strong>{offline.length}</strong><span>resources available offline</span></div><div><strong>{data.progress.length}</strong><span>learning activities saved</span></div><div><strong>{data.progress.filter((p) => p.synced).length}</strong><span>activities synchronized</span></div></div><div className="resource-grid">{offline.map((resource) => <ResourceCard key={resource.resource_id} resource={resource} onOpen={() => onOpenResource(resource)} download={data.downloads.find((d) => d.resource_id === resource.resource_id && d.status === 'completed')} />)}</div></>}</>; }

function SettingsPage({ data }: { data: ReturnType<typeof useAppData> }) {
  const [budget, setBudget] = useState(String(Math.round(data.settings!.data_budget_bytes / (1024 * 1024))));
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const save = async () => { await data.updateSettings({ data_budget_bytes: Math.max(1, Number(budget)) * 1024 * 1024 }); setSaved(true); setTimeout(() => setSaved(false), 2200); };
  const setConnection = async (status: ConnectionStatus) => { await data.updateSettings({ simulated_connection: status, simulation_mode: true }); };
  const handleReset = async () => { setResetting(true); await data.resetLocalData(); setResetting(false); setConfirmReset(false); };
  return <><PageTitle eyebrow="Control center" title="Preferences" description="Tune LearnLiteLearnLite to match your data, subjects, and real-world connection." action={saved ? <div className="saved-state"><CheckCircle2 size={16} /> Saved</div> : <button className="primary-button" onClick={() => void save()}><Check size={16} /> Save changes</button>} /><div className="settings-layout"><section className="panel settings-section"><div className="settings-heading"><div className="settings-icon coral"><Database size={18} /></div><div><h2>Data budget</h2><p>The maximum data LearnLite may use for resources on this device.</p></div></div><div className="budget-options">{['5', '10', '20', '50'].map((value) => <button key={value} className={budget === value ? 'active' : ''} onClick={() => setBudget(value)}>{value} MB</button>)}<div className="custom-budget"><input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} min="1" /><span>MB custom</span></div></div><div className="settings-note"><Gauge size={16} /><span>Remaining budget is recalculated after every completed download.</span></div></section><section className="panel settings-section"><div className="settings-heading"><div className="settings-icon blue"><Signal size={18} /></div><div><h2>Connectivity simulator</h2><p>Preview how LearnLite behaves on different network conditions.</p></div></div><div className="connection-options">{(['connected', 'weak', 'intermittent', 'offline'] as ConnectionStatus[]).map((status) => <button key={status} className={data.connection === status ? `active ${status}` : ''} onClick={() => void setConnection(status)}><span className="status-dot" /><strong>{status === 'connected' ? 'Strong' : status === 'weak' ? 'Weak' : status === 'intermittent' ? 'Intermittent' : 'Offline'}</strong><small>{status === 'connected' ? 'Full speed' : status === 'weak' ? 'Small chunks' : status === 'intermittent' ? 'Pause & resume' : 'Study locally'}</small></button>)}</div></section><section className="panel settings-section"><div className="settings-heading"><div className="settings-icon teal"><SlidersHorizontal size={18} /></div><div><h2>Learning preferences</h2><p>Preferred subjects receive a small boost in the priority engine.</p></div></div><div className="preference-chips">{['Mathematics', 'Computer Science', 'Physics', 'Biology', 'Chemistry', 'English'].map((subject) => <button key={subject} className={data.settings!.preferred_subjects.includes(subject) ? 'selected' : ''} onClick={() => { const current = data.settings!.preferred_subjects; const next = current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject]; void data.updateSettings({ preferred_subjects: next }); }}>{data.settings!.preferred_subjects.includes(subject) && <Check size={14} />}{subject}</button>)}</div></section>
      <section className="panel settings-section"><div className="settings-heading"><div className="settings-icon teal"><Database size={18} /></div><div><h2>Prototype mode</h2><p>All learning resources and sync behavior are stored locally in your browser. Connectivity can be simulated for testing.</p></div></div><div className="settings-note" style={{marginLeft: 0, marginTop: 10}}><Zap size={16} /><span>No data leaves your device. Reset local data at any time to start a clean test.</span></div></section>
      <section className="panel settings-section reset-section"><div className="settings-heading"><div className="settings-icon coral"><ArrowLeft size={18} /></div><div><h2>Reset local data</h2><p>Clears downloaded resources, saved progress, and pending sync data on this device. Your data budget and subject preferences will be kept.</p></div></div>{!confirmReset ? <button className="reset-button" onClick={() => setConfirmReset(true)}>Reset local data</button> : <div className="reset-confirm"><p>This will remove all downloaded resources, progress, and sync queue items from this device. Your budget and preferences will remain. Are you sure?</p><div className="reset-confirm-actions"><button className="secondary-button" onClick={() => setConfirmReset(false)}>Cancel</button><button className="reset-button destructive" onClick={() => void handleReset()} disabled={resetting}>{resetting ? 'Resetting…' : 'Yes, reset local data'}</button></div></div>}</section>
    </div></>; }

function ResourceViewer({ resource, data, onBack }: { resource: Resource; data: ReturnType<typeof useAppData>; onBack: () => void }) {
  const [localContent, setLocalContent] = useState<LocalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const progress = data.progress.find((item) => item.resource_id === resource.resource_id);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void data.getLocalContent(resource.resource_id).then((local) => {
      if (active) {
        setLocalContent(local ?? null);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [resource.resource_id, data.downloads]);

  if (loading) {
    return <div className="viewer-shell"><div className="viewer-loading"><BookOpen size={24} /><span>Loading lesson…</span></div></div>;
  }

  if (!localContent) {
    return <div className="viewer-shell">
      <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      <div className="viewer-empty"><BookOpen size={28} /><h2>Content not available offline</h2><p>This resource has not been downloaded yet. Download it while connected to study offline.</p></div>
    </div>;
  }

  const handleSaveProgress = (item: { resource_id: string; resource_title: string; status: 'in_progress' | 'completed'; score?: number; total_questions?: number; answers?: number[] }) => {
    void data.saveLearningProgress(item);
  };

  if (resource.content_type === 'quiz') {
    return <QuizViewer resource={resource} localContent={localContent} progress={progress} onBack={onBack} onSaveProgress={handleSaveProgress} />;
  }

  return <LessonViewer resource={resource} localContent={localContent} progress={progress} onBack={onBack} onSaveProgress={handleSaveProgress} />;
}

export default App;
