import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Backpack,
  ChevronRight,
  CircleHelp,
  Clock3,
  DoorOpen,
  Heart,
  Menu,
  MoveRight,
  Play,
  Search,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

type Gadget = {
  name: string;
  note: string;
  detail: string;
  color: string;
  icon: typeof DoorOpen;
};

const gadgets: Gadget[] = [
  {
    name: 'Anywhere Door',
    note: 'A shortcut to the impossible.',
    detail:
      'One bright pink doorway, and the distance between “I wish” and “I am there” folds away. It turns ordinary afternoons into tiny expeditions.',
    color: 'coral',
    icon: DoorOpen,
  },
  {
    name: 'Take-copter',
    note: 'The sky is suddenly local.',
    detail:
      'A little propeller with a very big promise. Clip it on, look up, and the neighbourhood becomes a map made for exploring.',
    color: 'sun',
    icon: Zap,
  },
  {
    name: 'Time Machine',
    note: 'Yesterday is not the end.',
    detail:
      'Hidden in a desk drawer, it makes time feel less like a wall and more like a hallway with interesting doors on either side.',
    color: 'violet',
    icon: Clock3,
  },
  {
    name: 'Small Light',
    note: 'Big things, pocket-sized.',
    detail:
      'A beam of cleverness for days when a problem feels too large. The best inventions do not erase wonder; they resize it.',
    color: 'mint',
    icon: Sparkles,
  },
];

const friends = [
  {
    initial: 'N',
    name: 'Nobita',
    role: 'The brave beginner',
    copy: 'A little clumsy, very kind, and always one more try away from surprising himself.',
    tone: 'blue',
  },
  {
    initial: 'S',
    name: 'Shizuka',
    role: 'The steady heart',
    copy: 'Curious and thoughtful — the friend who makes every adventure feel worth sharing.',
    tone: 'rose',
  },
  {
    initial: 'G',
    name: 'Gian',
    role: 'The loud protector',
    copy: 'Big energy, bigger loyalty. Beneath the noise is someone who shows up when it matters.',
    tone: 'gold',
  },
  {
    initial: 'S',
    name: 'Suneo',
    role: 'The quick spark',
    copy: 'A collector of clever plans, sharp observations, and stories that get better with every telling.',
    tone: 'green',
  },
];

function DoraemonIllustration() {
  return (
    <div className="doraemon-stage" aria-label="A CSS illustration inspired by a friendly blue time-travelling cat">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="spark spark-one"><Star size={14} /></div>
      <div className="spark spark-two"><Sparkles size={18} /></div>
      <div className="character-shadow" />
      <div className="character">
        <div className="character-body">
          <div className="face">
            <div className="eye eye-left" />
            <div className="eye eye-right" />
            <div className="nose" />
            <div className="nose-light" />
            <div className="whisker whisker-left-one" />
            <div className="whisker whisker-left-two" />
            <div className="whisker whisker-right-one" />
            <div className="whisker whisker-right-two" />
            <div className="mouth" />
            <div className="face-line" />
          </div>
          <div className="collar"><span /></div>
          <div className="pocket"><div className="pocket-line" /></div>
          <div className="arm arm-left" />
          <div className="arm arm-right" />
          <div className="foot foot-left" />
          <div className="foot foot-right" />
        </div>
      </div>
      <div className="stage-label">
        <span className="label-dot" />
        <span>FROM THE 22ND CENTURY</span>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGadget, setSelectedGadget] = useState(0);
  const [memory, setMemory] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const memories = useMemo(
    () => [
      'Every good adventure starts with someone saying, “Let’s try.”',
      'The best gadget is sometimes just a friend who stays.',
      'A small room can hold an enormous world.',
    ],
    [],
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const gadget = gadgets[selectedGadget];
  const GadgetIcon = gadget.icon;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="site-shell">
          <header className="topbar">
            <a href="#top" className="brand" data-testid="link-home" onClick={closeMenu}>
              <span className="brand-mark" aria-hidden="true"><span /></span>
              <span className="brand-copy"><strong>DOOR</strong><em>22</em></span>
            </a>
            <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
              <a href="#story" data-testid="link-story" onClick={closeMenu}>The story</a>
              <a href="#friends" data-testid="link-friends" onClick={closeMenu}>The circle</a>
              <a href="#gadgets" data-testid="link-gadgets" onClick={closeMenu}>Gadgets</a>
              <a href="#remember" data-testid="link-remember" onClick={closeMenu}>A note</a>
            </nav>
            <div className="topbar-actions">
              <button
                className="icon-button search-toggle"
                aria-label="Open search"
                data-testid="button-search"
                onClick={() => setShowSearch(true)}
              >
                <Search size={18} strokeWidth={2.2} />
              </button>
              <a href="#gadgets" className="nav-pill" data-testid="link-open-drawer">
                Open the drawer <ArrowUpRight size={15} />
              </a>
              <button
                className="icon-button menu-toggle"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                data-testid="button-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </header>

          {showSearch && (
            <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search this fan site">
              <button className="search-backdrop" aria-label="Close search" onClick={() => setShowSearch(false)} />
              <div className="search-panel">
                <div className="search-panel-top">
                  <span className="eyebrow">LOOKING FOR A LITTLE WONDER?</span>
                  <button className="icon-button" aria-label="Close search" onClick={() => setShowSearch(false)}><X size={20} /></button>
                </div>
                <label htmlFor="site-search">Search the collection</label>
                <div className="search-field">
                  <Search size={20} />
                  <input id="site-search" autoFocus placeholder="Try “Anywhere Door”" data-testid="input-search" />
                  <kbd>ESC</kbd>
                </div>
                <p>Browse the story, meet the circle, or open the gadget drawer below.</p>
              </div>
            </div>
          )}

          <main id="top">
            <section className="hero-section">
              <div className="hero-grid" />
              <div className="cloud cloud-left" />
              <div className="cloud cloud-right" />
              <div className="container hero-inner">
                <div className="hero-copy">
                  <div className="eyebrow reveal"><span className="eyebrow-line" /> A small fan-made field guide</div>
                  <h1 className="reveal reveal-delay-1">Open the door<br /><span>to wonder.</span></h1>
                  <p className="hero-intro reveal reveal-delay-2">
                    A pocket-sized celebration of a beloved fictional cartoon character, the friends who make every day brighter, and the inventions that turn “what if?” into a way of life.
                  </p>
                  <div className="hero-actions reveal reveal-delay-3">
                    <a href="#story" className="button button-dark" data-testid="button-begin-story">Begin the story <ArrowDownRight size={17} /></a>
                    <button className="text-link" data-testid="button-play-note" onClick={() => setMemory((value) => (value + 1) % memories.length)}>
                      <span className="play-circle"><Play size={11} fill="currentColor" /></span> Play a tiny note
                    </button>
                  </div>
                  <div className="hero-footnote reveal reveal-delay-3"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /></div>
                </div>
                <DoraemonIllustration />
              </div>
              <div className="hero-bottom">
                <div className="container hero-meta">
                  <span>01 / 05</span><div className="meta-rule" /><span>FRIENDSHIP • FUTURES • FOUND OBJECTS</span>
                  <span className="hero-meta-right">A FAN SITE BY <strong>ANKIT KUMAR</strong></span>
                </div>
              </div>
            </section>

            <section className="intro-strip">
              <div className="container intro-layout">
                <p className="section-kicker">WHY THIS WORLD STAYS</p>
                <div className="intro-statement">
                  <h2>For anyone who has ever wished their desk drawer had a <span>secret.</span></h2>
                  <p>Since the first page turns, this story has made room for the awkward kid, the impossible idea, and the friend who knows when to lend a hand.</p>
                </div>
                <a href="#friends" className="round-arrow" aria-label="Read about the circle" data-testid="link-read-circle"><ArrowDownRight size={21} /></a>
              </div>
            </section>

            <section id="story" className="story-section section-pad">
              <div className="container story-layout">
                <div className="section-heading">
                  <p className="section-kicker">01 — THE STORY</p>
                  <h2>A future friend<br /><i>in an ordinary room.</i></h2>
                  <div className="heading-rule" />
                  <p className="heading-aside">A series context, in three turns of the page.</p>
                </div>
                <div className="story-content">
                  <div className="story-lead">
                    <span className="number-mark">A</span>
                    <p>Doraemon arrives from a future not to become a superhero, but to help a boy named Nobita find his footing.</p>
                  </div>
                  <div className="story-copy-grid">
                    <p>The magic lives in the contrast: a cosmic pocket tucked into a school desk, a time machine hiding under a blanket, a world-sized imagination sharing space with unfinished homework.</p>
                    <p>Each episode becomes a gentle experiment. What happens when a shortcut meets a consequence? When a wish is bigger than the person making it? Usually, a friend is waiting at the other end.</p>
                  </div>
                  <div className="story-card">
                    <div className="story-card-art">
                      <div className="window-frame"><span /><span /><span /><span /></div>
                      <div className="desk-shape" /><div className="book-shape" /><div className="card-star"><Star size={18} fill="currentColor" /></div>
                    </div>
                    <div className="story-card-copy"><span className="tiny-label">THE CENTRAL IDEA</span><strong>Even the future<br />needs a friend.</strong><a href="#friends" data-testid="link-central-idea">Meet the circle <MoveRight size={15} /></a></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="friends" className="friends-section section-pad">
              <div className="container">
                <div className="section-topline"><p className="section-kicker">02 — THE CIRCLE</p><span>FOUR WAYS TO SHOW UP</span></div>
                <div className="friends-heading"><h2>No one explores<br /><i>alone.</i></h2><p>Every bright idea is made warmer by the people around it. Meet the friends who give this little universe its heartbeat.</p></div>
                <div className="friends-grid">
                  {friends.map((friend, index) => (
                    <article className={`friend-card tone-${friend.tone}`} key={friend.name} data-testid={`card-friend-${index}`}>
                      <div className="friend-top"><span className="friend-index">0{index + 1}</span><span className="friend-initial">{friend.initial}</span><Heart size={17} /></div>
                      <div className="friend-bottom"><p>{friend.role}</p><h3>{friend.name}</h3><span>{friend.copy}</span></div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="gadgets" className="gadgets-section section-pad">
              <div className="container">
                <div className="gadget-header">
                  <div><p className="section-kicker">03 — THE DRAWER</p><h2>Useful? Maybe.<br /><i>Wonderful? Definitely.</i></h2></div>
                  <p className="gadget-intro">The inventions are never just tricks. They are tiny mirrors for our biggest wishes — to go farther, fix faster, and make today feel a little less stuck.</p>
                </div>
                <div className="gadget-explorer">
                  <div className="gadget-list" role="tablist" aria-label="Doraemon-inspired gadgets">
                    {gadgets.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          className={selectedGadget === index ? `gadget-tab active ${item.color}` : 'gadget-tab'}
                          key={item.name}
                          role="tab"
                          aria-selected={selectedGadget === index}
                          data-testid={`button-gadget-${index}`}
                          onClick={() => setSelectedGadget(index)}
                        >
                          <span className="gadget-number">0{index + 1}</span><Icon size={23} /><span className="gadget-tab-name">{item.name}</span><ChevronRight size={17} className="gadget-chevron" />
                        </button>
                      );
                    })}
                    <div className="drawer-note"><Backpack size={18} /><span>OPEN<br /><strong>CAREFULLY</strong></span></div>
                  </div>
                  <div className={`gadget-display display-${gadget.color}`}>
                    <div className="display-dots" /><div className="display-top"><span>SELECTED OBJECT / 0{selectedGadget + 1}</span><CircleHelp size={16} /></div>
                    <div className="gadget-object"><GadgetIcon size={88} strokeWidth={1.1} /><div className="object-ring" /></div>
                    <div className="display-copy"><p className="tiny-label">THE {gadget.name.toUpperCase()}</p><h3>{gadget.note}</h3><p>{gadget.detail}</p></div>
                    <div className="display-footer"><span>INVENTION INDEX</span><div /><span>00{selectedGadget + 1}</span></div>
                  </div>
                </div>
                <div className="gadget-controls"><button className="outline-button" data-testid="button-random-gadget" onClick={() => setSelectedGadget((selectedGadget + 1) % gadgets.length)}>Surprise me <Sparkles size={16} /></button><span>Tap an object to open its little story.</span></div>
              </div>
            </section>

            <section className="timeline-section section-pad">
              <div className="container">
                <div className="section-topline"><p className="section-kicker">04 — A WAY OF SEEING</p><span>THE MAGIC IN THE EVERYDAY</span></div>
                <div className="timeline-grid">
                  <div className="timeline-copy"><h2>Look closer.<br /><i>There is always<br />another door.</i></h2><p>A pencil, a nap, a rainy window. In this world, the ordinary is not a limit — it is the first material for an adventure.</p><a href="#remember" className="button button-coral" data-testid="link-make-note">Make a note of it <ArrowUpRight size={16} /></a></div>
                  <div className="timeline">
                    <div className="timeline-item"><span>01</span><div><strong>Wish</strong><p>Start with the question you are almost shy to ask.</p></div></div>
                    <div className="timeline-item"><span>02</span><div><strong>Try</strong><p>Let curiosity be louder than the fear of getting it wrong.</p></div></div>
                    <div className="timeline-item"><span>03</span><div><strong>Share</strong><p>Bring a friend. The story gets better when it has two voices.</p></div></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="remember" className="remember-section">
              <div className="container remember-inner">
                <div className="remember-orbit"><div className="remember-door"><DoorOpen size={54} strokeWidth={1.1} /></div></div>
                <div className="remember-copy"><p className="section-kicker">05 — A NOTE TO KEEP</p><blockquote data-testid="text-memory">“{memories[memory]}”</blockquote><button className="text-link light-link" data-testid="button-next-memory" onClick={() => setMemory((value) => (value + 1) % memories.length)}>Open another note <ChevronRight size={17} /></button></div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <div className="container footer-top"><a href="#top" className="brand footer-brand" data-testid="link-footer-home"><span className="brand-mark" aria-hidden="true"><span /></span><span className="brand-copy"><strong>DOOR</strong><em>22</em></span></a><p>A fan-made field guide for curious minds.</p><a href="#top" className="back-top" data-testid="link-back-top">Back to the top <ArrowUpRight size={15} /></a></div>
            <div className="container footer-bottom"><span>© 2025 DOOR 22 / NOT OFFICIALLY AFFILIATED</span><span>MADE WITH WONDER BY <strong>ANKIT KUMAR</strong></span><span className="footer-sigil"><Star size={12} fill="currentColor" /> KEEP LOOKING</span></div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;