// Helper to dynamically calculate dates so Ongoing is always ~18 hours from current runtime
export const getInitialHackathons = () => {
  const now = Date.now();
  const HOUR = 3600 * 1000;
  const DAY = 24 * HOUR;

  return [
    {
      id: 'csi-hackgenesis-2026',
      title: 'CSI National HackGenesis 2026',
      tagline: 'Empowering Next-Gen Innovators to Solve Urban & Climate Crises with Generative AI',
      theme: 'AI for Social Good & Sustainable Cities',
      status: 'ongoing',
      banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
      gradient: 'from-teal-600 via-emerald-600 to-cyan-700',
      startDate: new Date(now - 30 * HOUR).toISOString(),
      endDate: new Date(now + 22 * HOUR).toISOString(),
      registrationDeadline: new Date(now + 18 * HOUR - 14 * 60 * 1000).toISOString(), // ~17h 46m remaining
      eligibility: 'Open to All College Undergraduates & Postgraduates (Any Major)',
      teamSize: { min: 2, max: 4 },
      prizePool: '₹2,50,000',
      location: 'Hybrid / CSI Virtual Arena & Central Campus',
      organizer: 'Computer Society of India - Student Chapter',
      tags: ['Generative AI', 'Python', 'Next.js', 'FastAPI', 'IoT', 'CleanTech'],
      description: `CSI National HackGenesis is India's flagship 48-hour student innovation sprint. Bring your most daring ideas in artificial intelligence, computer vision, and IoT to tackle pressing challenges in smart energy grids, public transportation, waste management, and equitable healthcare. 

Teams will have direct access to mentorship from top industry engineers, cloud compute credits, and hardware prototyping toolkits. Finalists will pitch directly to VC partners and tech leaders at the grand valedictory ceremony.`,
      rules: [
        'All team members must be enrolled in an accredited higher education institution.',
        'Teams must consist of 2 to 4 members. Cross-college teams are fully permitted.',
        'All software and design assets must be created during the official hackathon duration.',
        'Use of open-source libraries and APIs is allowed, provided they are cited in the submission README.',
        'Plagiarism or submission of pre-existing commercial projects will lead to immediate disqualification.',
        'Submissions require a public GitHub repository, short video demonstration, and working live link.'
      ],
      schedule: [
        { time: 'Day 1 - 10:00 AM', title: 'Opening Keynote & Problem Statements Release', desc: 'Kickoff with CSI dignitaries & industry sponsors' },
        { time: 'Day 1 - 04:00 PM', title: 'Mentorship Checkpoint 1', desc: 'Architecture review with Cloud Architects' },
        { time: 'Day 2 - 02:00 AM', title: 'Midnight Debugging Jam & Trivia', desc: 'Energy drinks, snacks, and technical support' },
        { time: 'Day 2 - 04:00 PM', title: 'Submissions Close & Code Freeze', desc: 'Final commits pushed to GitHub' },
        { time: 'Day 2 - 06:30 PM', title: 'Top 10 Live Pitch & Grand Award Ceremony', desc: 'Live judging and prize distribution' }
      ],
      prizes: [
        {
          rank: '1st Place (Grand Champion)',
          amount: '₹1,20,000',
          perk: 'Direct Incubation Seat + AWS $5,000 Credits + CSI Winner Trophy & Certs',
          icon: 'gold'
        },
        {
          rank: '2nd Place (First Runner-Up)',
          amount: '₹70,000',
          perk: 'Fast-track Interviews at Partner Unicorns + $2,500 Cloud Credits',
          icon: 'silver'
        },
        {
          rank: '3rd Place (Second Runner-Up)',
          amount: '₹35,000',
          perk: 'Premium Developer Swag Kit + 1-Year Free CSI National Membership',
          icon: 'bronze'
        },
        {
          rank: 'Best Diversity & Women-Led Team',
          amount: '₹25,000',
          perk: 'Special Track Award by Women in Tech Foundation',
          icon: 'special'
        }
      ],
      registeredTeams: [
        {
          id: 'team-hg-01',
          name: 'NeuralNomads',
          code: 'CSI7A4',
          leader: 'Aarav Sharma',
          members: ['Aarav Sharma', 'Priya Patel', 'Rohan Gupta'],
          createdAt: new Date(now - 28 * HOUR).toISOString()
        },
        {
          id: 'team-hg-02',
          name: 'GreenGrid Architects',
          code: 'CSI9M2',
          leader: 'Sneha Kulkarni',
          members: ['Sneha Kulkarni', 'Devansh Roy', 'Ananya Sen', 'Vikram Joshi'],
          createdAt: new Date(now - 24 * HOUR).toISOString()
        },
        {
          id: 'team-hg-03',
          name: 'HyperVision Labs',
          code: 'CSI3K8',
          leader: 'Aditya Verma',
          members: ['Aditya Verma', 'Tanvi Mehta'],
          createdAt: new Date(now - 20 * HOUR).toISOString()
        },
        {
          id: 'team-hg-04',
          name: 'QuantumPioneers',
          code: 'CSI6X1',
          leader: 'Kartik Nair',
          members: ['Kartik Nair', 'Siddharth Rao', 'Isha Deshmukh'],
          createdAt: new Date(now - 16 * HOUR).toISOString()
        }
      ],
      submissions: [
        {
          id: 'sub-hg-01',
          teamId: 'team-hg-01',
          teamName: 'NeuralNomads',
          projectName: 'EcoPulse AI',
          tagline: 'Hyperlocal carbon footprint auditing and smart HVAC load balancer using Vision AI',
          techStack: ['Python', 'FastAPI', 'Next.js', 'OpenAI', 'MQTT', 'Tailwind CSS'],
          repoUrl: 'https://github.com/neuralnomads/ecopulse-ai',
          demoUrl: 'https://ecopulse-demo.vercel.app',
          description: 'EcoPulse AI analyzes smart meter feeds and indoor occupancy cameras to automatically modulate industrial climate control, slashing municipal building energy consumption by up to 28%.',
          submittedAt: new Date(now - 4 * HOUR).toISOString(),
          isWinner: false
        },
        {
          id: 'sub-hg-02',
          teamId: 'team-hg-02',
          teamName: 'GreenGrid Architects',
          projectName: 'VoltMesh',
          tagline: 'Peer-to-peer solar energy trading protocol for smart city residential complexes',
          techStack: ['Solidity', 'React', 'Node.js', 'Web3.js', 'Tailwind CSS'],
          repoUrl: 'https://github.com/greengrid/voltmesh-core',
          demoUrl: 'https://voltmesh-live.dev',
          description: 'VoltMesh democratizes rooftop solar power distribution by allowing micro-producers to sell surplus energy directly to neighboring apartments through verifiable cryptographic contracts.',
          submittedAt: new Date(now - 2 * HOUR).toISOString(),
          isWinner: false
        }
      ]
    },
    {
      id: 'csi-chaincraft-2026',
      title: 'CSI ChainCraft Web3 & DeFi Summit',
      tagline: 'Building Trustless Financial Infrastructure & Scalable Zero-Knowledge Applications',
      theme: 'Zero-Knowledge Proofs & Next-Gen Fintech',
      status: 'upcoming',
      banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      startDate: new Date(now + 7 * DAY).toISOString(),
      endDate: new Date(now + 9 * DAY).toISOString(),
      registrationDeadline: new Date(now + 5 * DAY + 6 * HOUR).toISOString(),
      eligibility: 'Open Worldwide to Students, Web3 Enthusiasts, & Independent Researchers',
      teamSize: { min: 1, max: 4 },
      prizePool: '$10,000 USD',
      location: 'Virtual / Discord & Spatial Audio Metaverse',
      organizer: 'CSI Web3 Special Interest Group & Ethereum Foundation Fellows',
      tags: ['Solidity', 'Rust', 'Ethereum', 'ZK-Snarks', 'React', 'Arbitrum'],
      description: `ChainCraft 2026 focuses on overcoming current blockchain scalability, privacy, and user experience bottlenecks. Whether you are engineering account abstraction wallets, novel decentralized exchanges, cross-chain liquidity bridges, or privacy-preserving credentials with ZK-SNARKs, this is your launchpad.

Judged by core protocol engineers and supported by grant providers, winning prototypes will be considered for seed grants and accelerator fast-tracks.`,
      rules: [
        'Individual hackers or teams of up to 4 members are permitted.',
        'Smart contracts must be deployed to an Ethereum testnet (Sepolia, Arbitrum Sepolia, or Base Sepolia).',
        'Smart contracts must be verified on block explorers with source code made public.',
        'Frontend must interact with live testnet contracts with sample test wallets provided in documentation.',
        'Include a 3-minute video presentation explaining the cryptographic thesis and user flow.'
      ],
      schedule: [
        { time: 'Day 1 - 09:00 AM UTC', title: 'Decentralized Keynote & Track Reveal', desc: 'Welcome session with Ethereum Foundation researchers' },
        { time: 'Day 1 - 02:00 PM UTC', title: 'ZK-Rollups & Circom Masterclass', desc: 'Hands-on workshop for building ZK verifiers' },
        { time: 'Day 2 - 11:00 AM UTC', title: 'Security Audit & Gas Optimization Clinic', desc: '1-on-1 feedback on smart contract efficiency' },
        { time: 'Day 3 - 05:00 PM UTC', title: 'Submission Deadline & GitHub Push', desc: 'Smart contract deployment verification' },
        { time: 'Day 3 - 08:00 PM UTC', title: 'Global Demo Day & Grant Winners Announced', desc: 'Streamed live on YouTube and X Spaces' }
      ],
      prizes: [
        {
          rank: '1st Place Grand Champion',
          amount: '$5,000 USD',
          perk: 'Direct consideration for $25k Web3 Ecosystem Grant + Audit Sponsorship',
          icon: 'gold'
        },
        {
          rank: '2nd Place Runner-Up',
          amount: '$3,000 USD',
          perk: 'Direct Invitation to Global Web3 Hackers Fellowship',
          icon: 'silver'
        },
        {
          rank: '3rd Place',
          amount: '$1,500 USD',
          perk: 'Hardware Wallet bundle + Ledger Developer Pack',
          icon: 'bronze'
        },
        {
          rank: 'Best Public Good / ZK Privacy Track',
          amount: '$500 USD',
          perk: 'Exclusive Mentorship with Zero-Knowledge Cryptographers',
          icon: 'special'
        }
      ],
      registeredTeams: [
        {
          id: 'team-cc-01',
          name: 'ZeroKnowledge Collective',
          code: 'CSI8B2',
          leader: 'Kabir Singhania',
          members: ['Kabir Singhania', 'Rhea Banerjee'],
          createdAt: new Date(now - 2 * DAY).toISOString()
        },
        {
          id: 'team-cc-02',
          name: 'DeFiAlchemists',
          code: 'CSI4R9',
          leader: 'Meera Nambiar',
          members: ['Meera Nambiar', 'Sanjay Kumar', 'Farhan Ali'],
          createdAt: new Date(now - 1 * DAY).toISOString()
        }
      ],
      submissions: []
    },
    {
      id: 'csi-quantumcloud-2026',
      title: 'CSI QuantumCloud & Edge AI 2026',
      tagline: 'Orchestrating Next-Generation Microservices, Edge Compute, & Distributed Systems',
      theme: 'Edge Computing & Distributed Intelligence',
      status: 'upcoming',
      banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
      gradient: 'from-blue-600 via-cyan-600 to-teal-500',
      startDate: new Date(now + 28 * DAY).toISOString(),
      endDate: new Date(now + 30 * DAY).toISOString(),
      registrationDeadline: new Date(now + 24 * DAY).toISOString(),
      eligibility: 'Open to Engineering Students, Cloud Enthusiasts, & Systems Programmers',
      teamSize: { min: 2, max: 4 },
      prizePool: '₹1,80,000',
      location: 'CSI Tech Hub Auditorium & Online Streams',
      organizer: 'Computer Society of India - Cloud & DevOps SIG',
      tags: ['Docker', 'Kubernetes', 'WebAssembly', 'Go', 'Rust', 'TensorFlow Lite'],
      description: `As connected devices explode in numbers, centralizing inference in hyperscale data centers creates unsustainable latency and bandwidth costs. QuantumCloud challenges teams to bring intelligence directly to the extreme edge: autonomous vehicles, agricultural drones, remote medical diagnostic kits, and smart grids.

Learn and deploy high-performance WebAssembly runtimes, low-latency gRPC services, and compact neural network models on resource-constrained hardware.`,
      rules: [
        'Teams must consist of 2 to 4 members.',
        'Architectures must demonstrate local edge inference or decentralized processing.',
        'Code must compile with reproducible Docker containers or lightweight WASM binaries.',
        'Benchmarking scripts must be provided to measure latency and memory footprint.'
      ],
      schedule: [
        { time: 'Week 1', title: 'Team Matchmaking & Ideation Sessions', desc: 'Connect with hardware and systems developers' },
        { time: 'Week 2', title: 'Edge Architecture Office Hours', desc: 'Consult with CNCF & Kubernetes contributors' },
        { time: 'Hack Weekend', title: '36-Hour Continuous Build Sprint', desc: 'Live benchmarking servers opened for submissions' },
        { time: 'Final Day', title: 'Top 8 Live Edge Demonstrations', desc: 'Hardware testbed evaluation by technical jury' }
      ],
      prizes: [
        {
          rank: '1st Place Champion',
          amount: '₹90,000',
          perk: 'Raspberry Pi 5 Clusters + Certified Kubernetes Administrator (CKA) Vouchers',
          icon: 'gold'
        },
        {
          rank: '2nd Place',
          amount: '₹55,000',
          perk: 'Edge TPU Coral Accelerator kits + Cloud credits',
          icon: 'silver'
        },
        {
          rank: '3rd Place',
          amount: '₹35,000',
          perk: 'Developer Mechanical Keyboards + CSI Membership',
          icon: 'bronze'
        }
      ],
      registeredTeams: [
        {
          id: 'team-qc-01',
          name: 'WasmWizards',
          code: 'CSI2W7',
          leader: 'Aryan Kapoor',
          members: ['Aryan Kapoor', 'Bhavna Menon'],
          createdAt: new Date(now - 1 * DAY).toISOString()
        }
      ],
      submissions: []
    },
    {
      id: 'csi-cybershield-2026',
      title: 'CSI CyberShield Hackathon 2026',
      tagline: 'Defending Critical Digital Infrastructure with Zero-Trust Security & Offensive Auditing',
      theme: 'Defensive Cybersecurity & Zero Trust Systems',
      status: 'past',
      banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
      gradient: 'from-red-600 via-rose-700 to-amber-700',
      startDate: new Date(now - 32 * DAY).toISOString(),
      endDate: new Date(now - 30 * DAY).toISOString(),
      registrationDeadline: new Date(now - 34 * DAY).toISOString(),
      eligibility: 'Collegiate Ethical Hackers, Security Analysts, and Systems Developers',
      teamSize: { min: 2, max: 4 },
      prizePool: '₹2,00,000',
      location: 'CSI Cyber Range & Main Auditorium',
      organizer: 'CSI Information Security Chapter & CERT-In Affiliates',
      tags: ['Cybersecurity', 'Rust', 'Linux Kernel', 'Wireshark', 'Python', 'eBPF'],
      description: `The CyberShield 2026 Spring Edition brought together over 300 passionate student hackers to address the next frontier of cybersecurity: software supply chain attacks, AI-generated spear phishing, and kernel-level micro-segmentation.

Over 70 projects were submitted and evaluated against real-world adversarial exploit simulations in our private sandboxed environment. Here are the champion solutions crowned by the technical jury!`,
      rules: [
        'Strict ethical guidelines enforced. Testing only permitted on designated CTF sandbox target instances.',
        'Exploitation or scanning outside the isolated network resulted in immediate disqualification.',
        'All defensive tooling had to be compatible with standard Linux/eBPF runtimes.',
        'Full vulnerability disclosure write-ups were mandatory for scoring.'
      ],
      schedule: [
        { time: 'Completed', title: 'Sprint Kickoff & Sandboxed Targets Released', desc: '300+ developers commenced defense simulations' },
        { time: 'Completed', title: 'Red Team Attack Wave 1 & 2', desc: 'Simulated APT attacks launched against defenses' },
        { time: 'Completed', title: 'Final Code Freeze & Write-up Verification', desc: 'Scoring engine verified defensive integrity' },
        { time: 'Completed', title: 'Grand Award & Hall of Fame Induction', desc: 'Winners felicitated by National Cyber Defense Advisors' }
      ],
      prizes: [
        {
          rank: '1st Place Champion',
          amount: '₹1,00,000',
          perk: 'OSCP Certification Vouchers + Direct Internship Offers + Gold Trophies',
          icon: 'gold'
        },
        {
          rank: '2nd Place Runner-Up',
          amount: '₹65,000',
          perk: 'Bugcrowd Pentesting credits + Security Tooling Subscriptions',
          icon: 'silver'
        },
        {
          rank: '3rd Place',
          amount: '₹35,000',
          perk: 'Hardware Hacking kits (Flipper Zero & Wi-Fi Pineapple)',
          icon: 'bronze'
        }
      ],
      registeredTeams: [
        {
          id: 'team-cs-01',
          name: 'ZeroDaySentinels',
          code: 'CSI1Z9',
          leader: 'Tushar Aggarwal',
          members: ['Tushar Aggarwal', 'Divya Sundaram', 'Manish Sen', 'Kavita Hegde'],
          createdAt: new Date(now - 34 * DAY).toISOString()
        },
        {
          id: 'team-cs-02',
          name: 'KernelWatchers',
          code: 'CSI5K3',
          leader: 'Nikhil Chawla',
          members: ['Nikhil Chawla', 'Harshita Reddy', 'Pranav Kulkarni'],
          createdAt: new Date(now - 33 * DAY).toISOString()
        },
        {
          id: 'team-cs-03',
          name: 'CryptoGuardians',
          code: 'CSI9V1',
          leader: 'Varun Swaminathan',
          members: ['Varun Swaminathan', 'Simran Kaur'],
          createdAt: new Date(now - 33 * DAY).toISOString()
        }
      ],
      submissions: [
        {
          id: 'sub-cs-01',
          teamId: 'team-cs-01',
          teamName: 'ZeroDaySentinels',
          projectName: 'GuardianMesh',
          tagline: 'Autonomous zero-trust micro-segmentation and memory exploit mitigation via Linux eBPF',
          techStack: ['Rust', 'eBPF', 'Linux Kernel', 'Prometheus', 'React', 'Go'],
          repoUrl: 'https://github.com/zerodaysentinels/guardian-mesh',
          demoUrl: 'https://guardianmesh.security-demo.io',
          description: 'GuardianMesh inspects syscalls and packet headers at the Linux socket level with sub-microsecond overhead. It autonomously detects unauthorized process injection, isolates compromised containers, and generates immediate SIEM alerts before lateral movement can occur.',
          submittedAt: new Date(now - 30 * DAY).toISOString(),
          isWinner: true,
          winnerTier: '1st Place Grand Champion',
          score: 98.4
        },
        {
          id: 'sub-cs-02',
          teamId: 'team-cs-02',
          teamName: 'KernelWatchers',
          projectName: 'PhishGuard AI',
          tagline: 'Real-time deepfake audio & business email compromise (BEC) detection engine',
          techStack: ['Python', 'PyTorch', 'WebRTC', 'FastAPI', 'Tailwind CSS'],
          repoUrl: 'https://github.com/kernelwatchers/phishguard-ai',
          demoUrl: 'https://phishguard-ai.app',
          description: 'PhishGuard AI hooks into corporate communication pipelines (Slack, Teams, and SIP audio) to extract spectral anomalies in synthesized speech and flags semantic impersonation triggers in inbound vendor invoices.',
          submittedAt: new Date(now - 30 * DAY + 2 * HOUR).toISOString(),
          isWinner: true,
          winnerTier: '2nd Place Runner-Up',
          score: 94.8
        },
        {
          id: 'sub-cs-03',
          teamId: 'team-cs-03',
          teamName: 'CryptoGuardians',
          projectName: 'CryptaVault',
          tagline: 'Post-quantum encrypted key exchange protocol utilizing lattice-based cryptography (Kyber-1024)',
          techStack: ['C++', 'Rust', 'WebAssembly', 'TypeScript'],
          repoUrl: 'https://github.com/cryptoguardians/cryptavault-pqc',
          demoUrl: 'https://cryptavault.dev',
          description: 'CryptaVault introduces a drop-in TLS replacement module implementing NIST-approved post-quantum algorithms (ML-KEM / CRYSTALS-Kyber), insulating enterprise data in transit against harvest-now-decrypt-later attacks.',
          submittedAt: new Date(now - 30 * DAY + 4 * HOUR).toISOString(),
          isWinner: true,
          winnerTier: '3rd Place Bronze',
          score: 91.2
        }
      ]
    }
  ];
};
