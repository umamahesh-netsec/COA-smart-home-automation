import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Home,
  Sparkles,
  Bath,
  Tv,
  Thermometer,
  Refrigerator,
  WashingMachine,
  Droplets,
  Leaf,
  Camera,
  Lock,
  AlertTriangle,
  Car,
  Zap,
  Settings,
  Menu,
  X,
  Lightbulb,
  Fan,
  Wind,
  Waves,
  Shield,
  Activity,
  MapPin,
  Utensils,
  BedDouble,
  Cpu,
  HardDrive,
  ChevronRight,
  Clock3,
  CalendarDays,
  Power,
  Flame,
  Snowflake,
  ShowerHead,
  Music,
  Volume2,
  Pause,
  Play,
  Sprout,
  CheckCircle2,
  BatteryCharging,
  Fuel,
  Wifi,
  Unlock,
} from "lucide-react";
/* =========================================================
   TYPES
========================================================= */

type Page =
  | "Command Center"
  | "Kitchen"
  | "Rooms"
  | "Bathroom"
  | "Hall"
  | "Climate"
  | "Refrigerator"
  | "Cleaning"
  | "Home Water & Garden"
  | "Cameras"
  | "Access"
  | "Alerts"
  | "EV / Garage"
  | "Scenes"
  | "Automation"
  | "Home Intelligence"
  | "CPU Architecture"
  | "Memory"
  | "Bus Monitor";

type DeviceState = Record<string, boolean>;

interface DeviceCardProps {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  active: boolean;
  onToggle: () => void;
  value?: string;
  accent?: "cyan" | "green" | "orange" | "purple";
}

/* =========================================================
   NAVIGATION
========================================================= */

const navGroups: {
  group: string;
  items: [string, React.ElementType][];
}[] = [
  {
    group: "HOME",
    items: [
      ["Command Center", Home],
      ["Kitchen", Utensils],
      ["Rooms", BedDouble],
      ["Bathroom", Bath],
      ["Hall", Tv],
      ["Climate", Thermometer],
    ],
  },
  {
    group: "SYSTEMS",
    items: [
      ["Refrigerator", Refrigerator],
      ["Cleaning", WashingMachine],
      ["Home Water & Garden", Droplets],
    ],
  },
  {
    group: "SECURITY",
    items: [
      ["Cameras", Camera],
      ["Access", Shield],
      ["Alerts", AlertTriangle],
    ],
  },
  {
    group: "VEHICLE",
    items: [["EV / Garage", Car]],
  },
  {
    group: "CONTROL",
    items: [
      ["Scenes", Sparkles],
      ["Automation", Zap],
      ["Home Intelligence", Activity],
    ],
  },
  {
    group: "ARCHITECTURE",
    items: [
      ["CPU Architecture", Cpu],
      ["Memory", HardDrive],
      ["Bus Monitor", Waves],
    ],
  },
];

/* =========================================================
   DEVICE DATA
========================================================= */

const initialDevices: DeviceState = {
  kitchenLight: true,
  kitchenExhaust: false,
  induction: false,
  purifier: true,
  bedroomLight: false,
  bedroomFan: true,
  bathroomLight: true,
  bathroomExhaust: true,
  geyser: false,
  steamBath: false,
  hallLight: true,
  hallTv: true,
  music: false,
  refrigerator: true,
  washingMachine: false,
  floorCleaner: false,
  gardenPump: false,
  gardenIrrigation: false,
  garageLight: false,
  evCharging: false,
  cameraFront: true,
  cameraBack: true,
};

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [activePage, setActivePage] = useState<Page>("Command Center");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [devices, setDevices] = useState<DeviceState>(initialDevices);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [location, setLocation] = useState("Detecting location...");
  const [locationStatus, setLocationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  /* -------------------------------------------------------
     LIVE CLOCK
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     BROWSER LOCATION
  ------------------------------------------------------- */

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location unavailable");
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);

        setLocation(`${lat}°, ${lon}°`);
        setLocationStatus("success");
      },
      () => {
        setLocation("Location permission required");
        setLocationStatus("error");
      }
    );
  }, []);

  /* -------------------------------------------------------
     TOGGLE DEVICE
  ------------------------------------------------------- */

  const toggleDevice = (device: string) => {
    setDevices((previous) => ({
      ...previous,
      [device]: !previous[device],
    }));
  };

  /* -------------------------------------------------------
     TIME FORMATTING
  ------------------------------------------------------- */

  const liveTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const liveDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hour = currentTime.getHours();

  const greeting = useMemo(() => {
    if (hour < 12) return "Good morning.";
    if (hour < 17) return "Good afternoon.";
    return "Good evening.";
  }, [hour]);

  const activeDeviceCount = Object.values(devices).filter(Boolean).length;

  /* -------------------------------------------------------
     PAGE RENDER
  ------------------------------------------------------- */

  const renderPage = () => {
    switch (activePage) {
      case "Kitchen":
        return (
          <KitchenPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Rooms":
        return (
          <RoomsPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Bathroom":
        return (
          <BathroomPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Hall":
        return (
          <HallPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Refrigerator":
        return (
          <RefrigeratorPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Cleaning":
        return (
          <CleaningPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Home Water & Garden":
        return (
          <WaterGardenPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Climate":
        return <ClimatePage />;

      case "Cameras":
        return (
          <SecurityPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Access":
        return <AccessPage />;

      case "Alerts":
        return <AlertsPage />;

      case "EV / Garage":
        return (
          <EVPage
            devices={devices}
            toggleDevice={toggleDevice}
          />
        );

      case "Scenes":
        return <ScenesPage />;

      case "Automation":
        return <AutomationPage />;

      case "Home Intelligence":
        return <IntelligencePage />;

      case "CPU Architecture":
        return <CPUPage />;

      case "Memory":
        return <MemoryPage />;

      case "Bus Monitor":
        return <BusPage />;

      default:
        return (
          <CommandCenter
            devices={devices}
            toggleDevice={toggleDevice}
            activeDeviceCount={activeDeviceCount}
            liveTime={liveTime}
            liveDate={liveDate}
            greeting={greeting}
            location={location}
            locationStatus={locationStatus}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white selection:bg-cyan-400/20 selection:text-cyan-200">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.035] blur-[120px]" />
        <div className="absolute right-[-200px] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.025] blur-[130px]" />
        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.025] blur-[130px]" />
      </div>

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-[250px] border-r border-white/[0.07] bg-[#070a12]/95 backdrop-blur-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND */}

        <div className="flex h-[88px] items-center border-b border-white/[0.07] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/[0.08] shadow-[0_0_25px_rgba(34,211,238,0.08)]">
              <Home size={20} className="text-cyan-400" />
            </div>

            <div>
              <div className="text-[14px] font-semibold tracking-[0.18em]">
                HOMECORE
              </div>
              <div className="mt-0.5 text-[8px] tracking-[0.28em] text-slate-500">
                SMART HOME OS
              </div>
            </div>
          </div>

          <button
            className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-white/[0.05] hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION */}

        <div className="h-[calc(100vh-88px)] overflow-y-auto px-3 py-5 scrollbar-thin">
          {navGroups.map(({ group, items }) => (
            <div key={group} className="mb-6">
              <div className="mb-2 px-3 text-[9px] font-semibold tracking-[0.25em] text-slate-600">
                {group}
              </div>

              <div className="space-y-1">
                {items.map(([label, Icon]) => {
                  const selected = activePage === label;

                  return (
                    <button
                      key={label}
                      onClick={() => {
                        setActivePage(label as Page);

                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all duration-300 ${
                        selected
                          ? "border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 shadow-[inset_0_0_25px_rgba(34,211,238,0.025)]"
                          : "border border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.035] hover:text-slate-200"
                      }`}
                    >
                      {selected && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 h-5 w-[2px] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        />
                      )}

                      <Icon
                        size={16}
                        strokeWidth={1.7}
                        className={
                          selected
                            ? "text-cyan-400"
                            : "text-slate-600 group-hover:text-slate-300"
                        }
                      />

                      <span>{label}</span>

                      {selected && (
                        <ChevronRight
                          size={13}
                          className="ml-auto text-cyan-500/70"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}

      <main
        className={`relative min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[250px]" : "ml-0"
        }`}
      >
        {/* TOP BAR */}

        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-white/[0.06] bg-[#05070d]/75 px-5 backdrop-blur-2xl lg:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((value) => !value)}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
            </button>

            <div>
              <div className="text-[9px] tracking-[0.25em] text-slate-600">
                HOMECORE / SYSTEM
              </div>

              <div className="mt-1 text-[15px] font-semibold text-slate-100">
                {activePage}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-emerald-400 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              SYSTEM ONLINE
            </div>

            <button className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-slate-500 transition hover:text-white">
              <Settings size={16} />
            </button>
          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1500px] p-5 lg:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   COMMAND CENTER
========================================================= */

function CommandCenter({
  devices,
  toggleDevice,
  activeDeviceCount,
  liveTime,
  liveDate,
  greeting,
  location,
  locationStatus,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
  activeDeviceCount: number;
  liveTime: string;
  liveDate: string;
  greeting: string;
  location: string;
  locationStatus: "loading" | "success" | "error";
}) {
  return (
    <div className="space-y-5">
      {/* HERO */}

      <GlassPanel className="overflow-hidden">
        <div className="relative p-6 lg:p-7">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.025] blur-3xl" />

          <div className="relative grid gap-6 xl:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] text-cyan-400">
                <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                PERSONAL HOME COMMAND CENTER
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                {greeting}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Monitor your home environment, control virtual appliances and
                observe the computer system powering every decision.
              </p>

              {/* LIVE INFORMATION */}

              <div className="mt-6 flex flex-wrap gap-3">
                <InfoPill
                  icon={Clock3}
                  label="LOCAL TIME"
                  value={liveTime}
                />

                <InfoPill
                  icon={CalendarDays}
                  label="DATE"
                  value={liveDate}
                />

                <InfoPill
                  icon={MapPin}
                  label="LOCATION"
                  value={location}
                  status={locationStatus}
                />
              </div>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-2 self-start">
              <StatCard label="TEMP" value="26°C" />
              <StatCard label="DEVICES" value={String(activeDeviceCount)} />
              <StatCard label="ALERTS" value="0" />
              <StatCard label="ENERGY" value="72%" />
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* ENVIRONMENT + SYSTEM CORE */}

      <div className="grid gap-5 xl:grid-cols-[1.7fr_0.8fr]">
        <GlassPanel>
          <SectionHeader
            icon={Home}
            title="Digital Home"
            subtitle="Live virtual environment"
          />

          <div className="grid gap-3 p-4 md:grid-cols-2">
            <EnvironmentCard
              icon={Utensils}
              title="Kitchen"
              temperature="28°C"
              status="NORMAL"
            />

            <EnvironmentCard
              icon={BedDouble}
              title="Bedroom"
              temperature="24°C"
              status="NORMAL"
            />

            <EnvironmentCard
              icon={Tv}
              title="Hall"
              temperature="25°C"
              status="NORMAL"
            />

            <EnvironmentCard
              icon={Bath}
              title="Bathroom"
              temperature="27°C"
              status="NORMAL"
            />
          </div>
        </GlassPanel>

        <SystemCore />
      </div>

      {/* DEVICES */}

      <GlassPanel>
        <SectionHeader
          icon={Power}
          title="Home Devices"
          subtitle="Virtual appliance control"
        />

        <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
          <DeviceCard
            icon={Lightbulb}
            title="Main Lights"
            subtitle="Home lighting"
            active={devices.hallLight}
            onToggle={() => toggleDevice("hallLight")}
          />

          <DeviceCard
            icon={Fan}
            title="Bedroom Fan"
            subtitle="Air circulation"
            active={devices.bedroomFan}
            onToggle={() => toggleDevice("bedroomFan")}
          />

          <DeviceCard
            icon={Tv}
            title="Hall TV"
            subtitle="Entertainment"
            active={devices.hallTv}
            onToggle={() => toggleDevice("hallTv")}
          />

          <DeviceCard
            icon={Refrigerator}
            title="Refrigerator"
            subtitle="Kitchen cooling"
            active={devices.refrigerator}
            onToggle={() => toggleDevice("refrigerator")}
          />
        </div>
      </GlassPanel>
    </div>
  );
}

/* =========================================================
   KITCHEN
========================================================= */

function KitchenPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="HOME / KITCHEN"
      title="Kitchen"
      description="Monitor and control the major kitchen appliances from one virtual control deck."
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <GlassPanel>
          <SectionHeader
            icon={Utensils}
            title="Kitchen Environment"
            subtitle="Virtual appliance network"
          />

          <div className="grid gap-3 p-4 md:grid-cols-2">
            <DeviceCard
              icon={Lightbulb}
              title="Kitchen Light"
              subtitle="Main kitchen lighting"
              active={devices.kitchenLight}
              onToggle={() => toggleDevice("kitchenLight")}
            />

            <DeviceCard
              icon={Wind}
              title="Exhaust Fan"
              subtitle="Smoke & air extraction"
              active={devices.kitchenExhaust}
              onToggle={() => toggleDevice("kitchenExhaust")}
            />

            <DeviceCard
              icon={Flame}
              title="Induction"
              subtitle="Cooking surface"
              active={devices.induction}
              onToggle={() => toggleDevice("induction")}
            />

            <DeviceCard
              icon={Droplets}
              title="Water Purifier"
              subtitle="Drinking water system"
              active={devices.purifier}
              onToggle={() => toggleDevice("purifier")}
            />
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            icon={Refrigerator}
            title="Refrigerator"
            subtitle="Kitchen cooling system"
          />

          <div className="p-5">
            <div className="flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5">
              <div>
                <div className="text-4xl font-semibold">4°</div>
                <div className="mt-1 text-xs text-slate-600">
                  Refrigerator temperature
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/[0.08]">
                <Snowflake className="text-cyan-400" size={25} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <MiniRow label="Cooling" value="NORMAL" />
              <MiniRow label="Door" value="CLOSED" />
              <MiniRow label="Freezer" value="-18°C" />
              <MiniRow label="Energy" value="18%" />
            </div>
          </div>
        </GlassPanel>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   ROOMS
========================================================= */

function RoomsPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="HOME / ROOMS"
      title="Rooms"
      description="Room-specific environments with controls relevant to each space."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <RoomPanel
          icon={BedDouble}
          title="Bedroom"
          temperature="24°C"
          devices={[
            {
              icon: Lightbulb,
              title: "Bedroom Light",
              active: devices.bedroomLight,
              action: () => toggleDevice("bedroomLight"),
            },
            {
              icon: Fan,
              title: "Bedroom Fan",
              active: devices.bedroomFan,
              action: () => toggleDevice("bedroomFan"),
            },
          ]}
        />

        <RoomPanel
          icon={Tv}
          title="Hall"
          temperature="25°C"
          devices={[
            {
              icon: Lightbulb,
              title: "Hall Lights",
              active: devices.hallLight,
              action: () => toggleDevice("hallLight"),
            },
            {
              icon: Tv,
              title: "Hall TV",
              active: devices.hallTv,
              action: () => toggleDevice("hallTv"),
            },
          ]}
        />

        <RoomPanel
          icon={Utensils}
          title="Kitchen"
          temperature="28°C"
          devices={[
            {
              icon: Lightbulb,
              title: "Kitchen Light",
              active: devices.kitchenLight,
              action: () => toggleDevice("kitchenLight"),
            },
            {
              icon: Wind,
              title: "Exhaust Fan",
              active: devices.kitchenExhaust,
              action: () => toggleDevice("kitchenExhaust"),
            },
          ]}
        />

        <RoomPanel
          icon={Bath}
          title="Bathroom"
          temperature="27°C"
          devices={[
            {
              icon: Lightbulb,
              title: "Bathroom Light",
              active: devices.bathroomLight,
              action: () => toggleDevice("bathroomLight"),
            },
            {
              icon: Wind,
              title: "Exhaust Fan",
              active: devices.bathroomExhaust,
              action: () => toggleDevice("bathroomExhaust"),
            },
          ]}
        />
      </div>
    </PageLayout>
  );
}

/* =========================================================
   BATHROOM
========================================================= */

function BathroomPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="HOME / BATHROOM"
      title="Bathroom"
      description="Bathroom climate and comfort controls."
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <GlassPanel>
          <SectionHeader
            icon={Bath}
            title="Bathroom Control"
            subtitle="Comfort & ventilation"
          />

          <div className="grid gap-3 p-4 md:grid-cols-2">
            <DeviceCard
              icon={Lightbulb}
              title="Bathroom Light"
              subtitle="Main lighting"
              active={devices.bathroomLight}
              onToggle={() => toggleDevice("bathroomLight")}
            />

            <DeviceCard
              icon={Wind}
              title="Exhaust Fan"
              subtitle="Moisture extraction"
              active={devices.bathroomExhaust}
              onToggle={() => toggleDevice("bathroomExhaust")}
            />

            <DeviceCard
              icon={Flame}
              title="Electric Geyser"
              subtitle="Hot water system"
              active={devices.geyser}
              onToggle={() => toggleDevice("geyser")}
            />

            <DeviceCard
              icon={ShowerHead}
              title="Steam Bath"
              subtitle="Virtual steam system"
              active={devices.steamBath}
              onToggle={() => toggleDevice("steamBath")}
            />
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            icon={Thermometer}
            title="Bathroom Climate"
            subtitle="Environment telemetry"
          />

          <div className="p-5">
            <div className="text-5xl font-semibold">27°</div>

            <div className="mt-1 text-xs text-slate-600">
              Current temperature
            </div>

            <div className="mt-6 space-y-3">
              <TelemetryBar label="Humidity" value={68} />
              <TelemetryBar label="Air Quality" value={91} />
              <TelemetryBar label="Comfort" value={84} />
            </div>
          </div>
        </GlassPanel>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   HALL
========================================================= */

function HallPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="HOME / HALL"
      title="Hall Entertainment"
      description="Control the television, music and lighting environment."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <DeviceCard
          icon={Tv}
          title="Smart TV"
          subtitle="Entertainment display"
          active={devices.hallTv}
          onToggle={() => toggleDevice("hallTv")}
        />

        <DeviceCard
          icon={Music}
          title="Music System"
          subtitle="Home audio"
          active={devices.music}
          onToggle={() => toggleDevice("music")}
        />

        <DeviceCard
          icon={Lightbulb}
          title="Hall Lighting"
          subtitle="Ambient lighting"
          active={devices.hallLight}
          onToggle={() => toggleDevice("hallLight")}
        />
      </div>

      <GlassPanel className="mt-5">
        <SectionHeader
          icon={Volume2}
          title="Entertainment Status"
          subtitle="Virtual media environment"
        />

        <div className="grid gap-3 p-4 md:grid-cols-3">
          <MiniStat title="TV" value={devices.hallTv ? "PLAYING" : "OFF"} />
          <MiniStat
            title="Music"
            value={devices.music ? "PLAYING" : "IDLE"}
          />
          <MiniStat
            title="Lights"
            value={devices.hallLight ? "ON" : "OFF"}
          />
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   REFRIGERATOR
========================================================= */

function RefrigeratorPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="SYSTEMS / REFRIGERATOR"
      title="Refrigerator"
      description="Detailed refrigerator monitoring and cooling controls."
    >
      <GlassPanel>
        <div className="grid gap-6 p-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.025] p-8">
            <Refrigerator size={64} className="text-cyan-400" />

            <div className="mt-5 text-5xl font-semibold">4°C</div>

            <div className="mt-2 text-xs text-slate-600">
              Refrigerator temperature
            </div>

            <div className="mt-5">
              <StatusBadge
                active={devices.refrigerator}
                text={devices.refrigerator ? "COOLING ACTIVE" : "SYSTEM OFF"}
              />
            </div>
          </div>

          <div>
            <div className="grid gap-3 md:grid-cols-2">
              <MetricCard title="Freezer" value="-18°C" />
              <MetricCard title="Door" value="CLOSED" />
              <MetricCard title="Humidity" value="42%" />
              <MetricCard title="Energy" value="18%" />
            </div>

            <button
              onClick={() => toggleDevice("refrigerator")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] py-3 text-sm text-cyan-300 transition hover:bg-cyan-400/[0.12]"
            >
              <Power size={16} />
              {devices.refrigerator ? "Turn Refrigerator OFF" : "Turn Refrigerator ON"}
            </button>
          </div>
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   CLEANING
========================================================= */

function CleaningPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="SYSTEMS / CLEANING"
      title="Cleaning Center"
      description="Floor cleaning and washing machine control."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassPanel>
          <SectionHeader
            icon={Sparkles}
            title="Floor Cleaning"
            subtitle="Virtual robotic cleaner"
          />

          <div className="p-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div>
                <div className="text-lg font-semibold">HomeBot</div>
                <div className="mt-1 text-xs text-slate-600">
                  Living room + hall
                </div>
              </div>

              <StatusBadge
                active={devices.floorCleaner}
                text={devices.floorCleaner ? "CLEANING" : "READY"}
              />
            </div>

            <div className="mt-4 space-y-3">
              <MiniRow label="Battery" value="78%" />
              <MiniRow label="Coverage" value="64%" />
              <MiniRow label="Dust container" value="32%" />
            </div>

            <button
              onClick={() => toggleDevice("floorCleaner")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] py-3 text-sm text-cyan-300 transition hover:bg-cyan-400/[0.12]"
            >
              {devices.floorCleaner ? (
                <>
                  <Pause size={16} />
                  Stop Cleaning
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start Cleaning
                </>
              )}
            </button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            icon={WashingMachine}
            title="Washing Machine"
            subtitle="Laundry appliance"
          />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-semibold">IDLE</div>
                <div className="mt-1 text-xs text-slate-600">
                  Ready for next cycle
                </div>
              </div>

              <WashingMachine size={48} className="text-cyan-400" />
            </div>

            <div className="mt-6 space-y-3">
              <MiniRow label="Mode" value="NORMAL" />
              <MiniRow label="Water" value="READY" />
              <MiniRow label="Door" value="LOCKED" />
              <MiniRow label="Estimated time" value="45 MIN" />
            </div>

            <button
              onClick={() => toggleDevice("washingMachine")}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition ${
                devices.washingMachine
                  ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              <Power size={16} />
              {devices.washingMachine
                ? "Washing Cycle Running"
                : "Start Washing Cycle"}
            </button>
          </div>
        </GlassPanel>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   WATER + GARDEN
========================================================= */

function WaterGardenPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="SYSTEMS / WATER & GARDEN"
      title="Home Water & Garden"
      description="A unified water management environment connecting household storage and garden irrigation."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <WaterTank
          icon={Droplets}
          title="House Water Tank"
          level={78}
          subtitle="Main domestic storage"
        />

        <WaterTank
          icon={Sprout}
          title="Garden Water Tank"
          level={55}
          subtitle="Garden irrigation storage"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassPanel>
          <SectionHeader
            icon={Leaf}
            title="Garden Environment"
            subtitle="Plant & soil monitoring"
          />

          <div className="grid gap-3 p-4 md:grid-cols-2">
            <MetricCard title="Soil Moisture" value="64%" />
            <MetricCard title="Temperature" value="29°C" />
            <MetricCard title="Humidity" value="58%" />
            <MetricCard title="Plants" value="24" />
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            icon={Droplets}
            title="Irrigation Control"
            subtitle="Garden water distribution"
          />

          <div className="p-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div>
                <div className="font-semibold">Garden Pump</div>
                <div className="mt-1 text-xs text-slate-600">
                  Automated irrigation system
                </div>
              </div>

              <StatusBadge
                active={devices.gardenPump}
                text={devices.gardenPump ? "RUNNING" : "IDLE"}
              />
            </div>

            <button
              onClick={() => toggleDevice("gardenPump")}
              className="mt-4 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] py-3 text-sm text-cyan-300 transition hover:bg-cyan-400/[0.12]"
            >
              {devices.gardenPump ? "Stop Water Pump" : "Start Water Pump"}
            </button>

            <button
              onClick={() => toggleDevice("gardenIrrigation")}
              className={`mt-3 w-full rounded-xl border py-3 text-sm transition ${
                devices.gardenIrrigation
                  ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-400"
              }`}
            >
              {devices.gardenIrrigation
                ? "Irrigation Active"
                : "Enable Irrigation"}
            </button>
          </div>
        </GlassPanel>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   CLIMATE
========================================================= */

function ClimatePage() {
  return (
    <PageLayout
      eyebrow="HOME / CLIMATE"
      title="Climate"
      description="Environmental conditions across the virtual home."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Home Temperature" value="26°C" />
        <MetricCard title="Humidity" value="61%" />
        <MetricCard title="Air Quality" value="94%" />
        <MetricCard title="Comfort" value="89%" />
      </div>

      <GlassPanel className="mt-5">
        <SectionHeader
          icon={Thermometer}
          title="Room Climate"
          subtitle="Current environmental telemetry"
        />

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <TelemetryBar label="Kitchen — 28°C" value={82} />
          <TelemetryBar label="Bedroom — 24°C" value={72} />
          <TelemetryBar label="Hall — 25°C" value={77} />
          <TelemetryBar label="Bathroom — 27°C" value={84} />
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   SECURITY
========================================================= */

function SecurityPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="SECURITY / CAMERAS"
      title="Home Security"
      description="Virtual camera and perimeter monitoring."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <CameraCard
          title="Front Entrance"
          active={devices.cameraFront}
          onToggle={() => toggleDevice("cameraFront")}
        />

        <CameraCard
          title="Back Garden"
          active={devices.cameraBack}
          onToggle={() => toggleDevice("cameraBack")}
        />
      </div>

      <GlassPanel className="mt-5">
        <SectionHeader
          icon={Shield}
          title="Security Status"
          subtitle="Home perimeter"
        />

        <div className="grid gap-3 p-4 md:grid-cols-3">
          <MiniStat title="Cameras" value="2 / 2 ONLINE" />
          <MiniStat title="Access" value="SECURE" />
          <MiniStat title="Alerts" value="0 ACTIVE" />
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   ACCESS
========================================================= */

function AccessPage() {
  return (
    <PageLayout
      eyebrow="SECURITY / ACCESS"
      title="Access Control"
      description="Virtual doors and access management."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <AccessCard title="Main Door" locked />
        <AccessCard title="Garage Door" locked />
        <AccessCard title="Back Door" locked />
        <AccessCard title="Garden Gate" locked />
      </div>
    </PageLayout>
  );
}

/* =========================================================
   ALERTS
========================================================= */

function AlertsPage() {
  return (
    <PageLayout
      eyebrow="SECURITY / ALERTS"
      title="Alerts"
      description="System notifications and home events."
    >
      <GlassPanel>
        <div className="flex flex-col items-center justify-center p-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/[0.07]">
            <CheckCircle2 size={30} className="text-emerald-400" />
          </div>

          <div className="mt-5 text-lg font-semibold">No active alerts</div>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            HomeCore has not detected any active virtual security or appliance
            alerts.
          </p>
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   EV / GARAGE
========================================================= */

function EVPage({
  devices,
  toggleDevice,
}: {
  devices: DeviceState;
  toggleDevice: (device: string) => void;
}) {
  return (
    <PageLayout
      eyebrow="VEHICLE / GARAGE"
      title="EV & Garage"
      description="Electric vehicle charging and garage environment."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassPanel>
          <SectionHeader
            icon={Car}
            title="Electric Vehicle"
            subtitle="Virtual charging system"
          />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-semibold">68%</div>
                <div className="mt-1 text-xs text-slate-600">
                  Battery level
                </div>
              </div>

              <BatteryCharging size={48} className="text-cyan-400" />
            </div>

            <TelemetryBar label="Battery" value={68} />

            <button
              onClick={() => toggleDevice("evCharging")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] py-3 text-sm text-cyan-300"
            >
              <Zap size={16} />
              {devices.evCharging ? "Charging Active" : "Start Charging"}
            </button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            icon={Fuel}
            title="Garage"
            subtitle="Vehicle environment"
          />

          <div className="grid gap-3 p-5">
            <MetricCard title="Temperature" value="25°C" />
            <MetricCard title="Door" value="CLOSED" />
            <MetricCard title="Lighting" value="OFF" />
          </div>
        </GlassPanel>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   SCENES
========================================================= */

function ScenesPage() {
  const scenes = [
    ["Morning", "Lights + climate + kitchen", "START"],
    ["Movie Night", "TV + music + hall lights", "START"],
    ["Sleep", "Lights off + security", "START"],
    ["Away", "Security + appliances", "START"],
  ];

  return (
    <PageLayout
      eyebrow="CONTROL / SCENES"
      title="Scenes"
      description="One-click virtual home automation presets."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {scenes.map(([title, description, action]) => (
          <GlassPanel key={title}>
            <div className="p-5">
              <Sparkles size={20} className="text-cyan-400" />
              <div className="mt-4 text-lg font-semibold">{title}</div>
              <div className="mt-1 text-sm text-slate-600">{description}</div>

              <button className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-slate-300 transition hover:bg-white/[0.06]">
                {action}
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   AUTOMATION
========================================================= */

function AutomationPage() {
  return (
    <PageLayout
      eyebrow="CONTROL / AUTOMATION"
      title="Automation"
      description="Rule-based virtual automation logic."
    >
      <div className="grid gap-4">
        <AutomationRule
          title="Bathroom Ventilation"
          rule="If bathroom humidity > 65%"
          action="Turn exhaust fan ON"
        />

        <AutomationRule
          title="Garden Irrigation"
          rule="If soil moisture < 40%"
          action="Start garden pump"
        />

        <AutomationRule
          title="Kitchen Exhaust"
          rule="If kitchen temperature > 30°C"
          action="Turn exhaust fan ON"
        />

        <AutomationRule
          title="EV Charging"
          rule="If EV battery < 30%"
          action="Start charging"
        />
      </div>
    </PageLayout>
  );
}

/* =========================================================
   HOME INTELLIGENCE
========================================================= */

function IntelligencePage() {
  return (
    <PageLayout
      eyebrow="CONTROL / INTELLIGENCE"
      title="Home Intelligence"
      description="Computer-based decision layer for the virtual smart home."
    >
      <GlassPanel>
        <div className="grid gap-5 p-6 md:grid-cols-3">
          <IntelligenceMetric
            icon={Cpu}
            title="Decision Engine"
            value="ONLINE"
          />

          <IntelligenceMetric
            icon={Activity}
            title="Automation Rules"
            value="12"
          />

          <IntelligenceMetric
            icon={Wifi}
            title="Virtual Network"
            value="STABLE"
          />
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

/* =========================================================
   COMPUTER ARCHITECTURE
========================================================= */

function CPUPage() {
  return (
    <PageLayout
      eyebrow="ARCHITECTURE / CPU"
      title="CPU Architecture"
      description="Virtual computer architecture powering HomeCore."
    >
      <GlassPanel>
        <div className="grid gap-4 p-5 md:grid-cols-3">
          <MetricCard title="CPU Load" value="31%" />
          <MetricCard title="Cores" value="4" />
          <MetricCard title="Frequency" value="2.40 GHz" />
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

function MemoryPage() {
  return (
    <PageLayout
      eyebrow="ARCHITECTURE / MEMORY"
      title="Memory"
      description="Virtual memory telemetry."
    >
      <GlassPanel>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-semibold">44%</div>
              <div className="mt-1 text-xs text-slate-600">
                RAM utilization
              </div>
            </div>

            <HardDrive size={40} className="text-cyan-400" />
          </div>

          <div className="mt-6">
            <TelemetryBar label="RAM Usage" value={44} />
          </div>
        </div>
      </GlassPanel>
    </PageLayout>
  );
}

function BusPage() {
  return (
    <PageLayout
      eyebrow="ARCHITECTURE / BUS"
      title="Bus Monitor"
      description="Virtual system communication activity."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Data Bus" value="ACTIVE" />
        <MetricCard title="Address Bus" value="STABLE" />
        <MetricCard title="I/O Bus" value="NORMAL" />
      </div>
    </PageLayout>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ borderColor: "rgba(255,255,255,0.11)" }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border border-white/[0.07] bg-[#080c15]/75 shadow-[0_15px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PageLayout({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="text-[9px] font-semibold tracking-[0.28em] text-cyan-500">
          {eyebrow}
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/[0.06]">
        <Icon size={17} className="text-cyan-400" />
      </div>

      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-[10px] text-slate-600">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function DeviceCard({
  icon: Icon,
  title,
  subtitle,
  active,
  onToggle,
}: DeviceCardProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      onClick={onToggle}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
        active
          ? "border-cyan-400/20 bg-cyan-400/[0.045] shadow-[0_0_30px_rgba(34,211,238,0.04)]"
          : "border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            active ? "bg-cyan-400/[0.10]" : "bg-white/[0.035]"
          }`}
        >
          <Icon
            size={17}
            className={active ? "text-cyan-400" : "text-slate-600"}
          />
        </div>

        <span
          className={`text-[8px] font-semibold tracking-[0.18em] ${
            active ? "text-cyan-400" : "text-slate-700"
          }`}
        >
          {active ? "ON" : "OFF"}
        </span>
      </div>

      <div className="mt-5 text-sm font-medium">{title}</div>

      {subtitle && (
        <div className="mt-1 text-[10px] text-slate-600">{subtitle}</div>
      )}

      <div className="mt-4 flex items-center gap-1.5 text-[9px] text-slate-700">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-cyan-400" : "bg-slate-700"
          }`}
        />
        Click to toggle
      </div>
    </motion.button>
  );
}

function EnvironmentCard({
  icon: Icon,
  title,
  temperature,
  status,
}: {
  icon: React.ElementType;
  title: string;
  temperature: string;
  status: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 transition-all hover:bg-white/[0.025]"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>

        <Icon size={19} className="text-slate-600" />
      </div>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-3xl font-semibold">{temperature}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[9px] tracking-[0.12em] text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {status}
      </div>
    </motion.div>
  );
}

function SystemCore() {
  return (
    <GlassPanel>
      <SectionHeader
        icon={Cpu}
        title="System Core"
        subtitle="Virtual computer telemetry"
      />

      <div className="space-y-5 p-5">
        <TelemetryBar label="CPU LOAD" value={31} />
        <TelemetryBar label="RAM USAGE" value={44} />
        <TelemetryBar label="CACHE HIT" value={94} />

        <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-[0.18em] text-cyan-400">
              CURRENT INSTRUCTION
            </span>

            <span className="text-[8px] text-emerald-400">EXECUTING</span>
          </div>

          <div className="mt-4 font-mono text-xs text-slate-300">
            CHECK_HOME_STATUS
          </div>

          <div className="mt-4 flex items-center gap-2 text-[8px] text-slate-700">
            <span>FETCH</span>
            <ChevronRight size={11} />
            <span>DECODE</span>
            <ChevronRight size={11} />
            <span className="text-cyan-400">EXECUTE</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function TelemetryBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[9px] tracking-[0.12em] text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
      <div className="text-[8px] tracking-[0.2em] text-slate-600">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold text-slate-200">
        {value}
      </div>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
  status,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  status?: "loading" | "success" | "error";
}) {
  return (
    <div className="flex max-w-full items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2">
      <Icon size={13} className="shrink-0 text-cyan-400" />

      <div className="min-w-0">
        <div className="text-[7px] tracking-[0.15em] text-slate-700">
          {label}
        </div>

        <div className="max-w-[230px] truncate text-[10px] text-slate-400">
          {value}
        </div>
      </div>

      {status === "loading" && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
      )}

      {status === "success" && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      )}
    </div>
  );
}

function MiniRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.045] py-2.5 last:border-0">
      <span className="text-xs text-slate-600">{label}</span>
      <span className="text-xs font-medium text-slate-300">{value}</span>
    </div>
  );
}

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <div className="text-[9px] tracking-[0.15em] text-slate-700">
        {title}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-300">
        {value}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="text-[9px] tracking-[0.15em] text-slate-700">
        {title}
      </div>

      <div className="mt-3 text-xl font-semibold text-slate-200">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({
  active,
  text,
}: {
  active: boolean;
  text: string;
}) {
  return (
    <div
      className={`rounded-full border px-3 py-1.5 text-[8px] font-semibold tracking-[0.15em] ${
        active
          ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
          : "border-white/[0.07] bg-white/[0.025] text-slate-600"
      }`}
    >
      {text}
    </div>
  );
}

function RoomPanel({
  icon: Icon,
  title,
  temperature,
  devices,
}: {
  icon: React.ElementType;
  title: string;
  temperature: string;
  devices: {
    icon: React.ElementType;
    title: string;
    active: boolean;
    action: () => void;
  }[];
}) {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.06]">
            <Icon size={18} className="text-cyan-400" />
          </div>

          <div>
            <div className="font-semibold">{title}</div>
            <div className="mt-1 text-[10px] text-slate-600">
              Environment
            </div>
          </div>
        </div>

        <div className="text-2xl font-semibold">{temperature}</div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {devices.map((device) => (
          <DeviceCard
            key={device.title}
            icon={device.icon}
            title={device.title}
            active={device.active}
            onToggle={device.action}
          />
        ))}
      </div>
    </GlassPanel>
  );
}

function WaterTank({
  icon: Icon,
  title,
  level,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  level: number;
  subtitle: string;
}) {
  return (
    <GlassPanel>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.06]">
            <Icon size={19} className="text-cyan-400" />
          </div>

          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-[10px] text-slate-600">{subtitle}</div>
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between">
          <div className="text-5xl font-semibold">{level}%</div>

          <div className="text-[9px] tracking-[0.15em] text-emerald-400">
            NORMAL
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-cyan-400"
          />
        </div>
      </div>
    </GlassPanel>
  );
}

function CameraCard({
  title,
  active,
  onToggle,
}: {
  title: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <GlassPanel>
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-[#090d15]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.07),transparent_60%)]" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 text-[8px] tracking-[0.15em] text-slate-400 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          LIVE
        </div>

        <Camera
          size={42}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700"
        />
      </div>

      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-[9px] text-slate-600">
            Virtual camera feed
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`rounded-lg px-3 py-2 text-[9px] ${
            active
              ? "bg-emerald-400/[0.08] text-emerald-400"
              : "bg-white/[0.04] text-slate-600"
          }`}
        >
          {active ? "ONLINE" : "OFFLINE"}
        </button>
      </div>
    </GlassPanel>
  );
}

function AccessCard({
  title,
  locked,
}: {
  title: string;
  locked: boolean;
}) {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.06]">
            {locked ? (
              <Lock size={18} className="text-emerald-400" />
            ) : (
              <Unlock size={18} className="text-yellow-400" />
            )}
          </div>

          <div>
            <div className="font-semibold">{title}</div>
            <div className="mt-1 text-[10px] text-slate-600">
              Access point
            </div>
          </div>
        </div>

        <span className="text-[9px] tracking-[0.15em] text-emerald-400">
          LOCKED
        </span>
      </div>
    </GlassPanel>
  );
}

function AutomationRule({
  title,
  rule,
  action,
}: {
  title: string;
  rule: string;
  action: string;
}) {
  return (
    <GlassPanel>
      <div className="grid gap-4 p-5 md:grid-cols-[0.7fr_1fr_1fr] md:items-center">
        <div className="font-semibold">{title}</div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-slate-500">
          {rule}
        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-3 text-xs text-cyan-400">
          → {action}
        </div>
      </div>
    </GlassPanel>
  );
}

function IntelligenceMetric({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <Icon size={20} className="text-cyan-400" />
      <div className="mt-5 text-[9px] tracking-[0.15em] text-slate-700">
        {title}
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}