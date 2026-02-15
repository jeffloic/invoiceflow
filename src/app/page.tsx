
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Zap,
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  BarChart3
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <span className="text-2xl font-bold text-indigo-600">InvoiceFlow</span>
          </div>
          <div className="flex flex-1 justify-end gap-x-6">
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 my-auto hover:text-indigo-600 transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* 1. Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Create and manage invoices in seconds
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                The perfect tool for freelancers and small businesses. Stop wasting time on paperwork and get paid faster with professional invoices.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                >
                  Get Started for Free
                </Link>
                <Link href="/demo" className="text-sm font-semibold leading-6 text-gray-900 flex items-center group">
                  View Demo <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Screenshot Placeholder */}
          <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-24">
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="bg-white rounded-md shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center border border-gray-200">
                <div className="text-center p-12">
                  <LayoutDashboard className="mx-auto h-24 w-24 text-gray-300" />
                  <p className="mt-4 text-gray-400 font-medium">Dashboard Screenshot</p>
                  <p className="text-sm text-gray-400">Main dashboard view with charts and lists</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white py-8 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">No credit card required</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <ShieldCheck className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">Secure cloud storage</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="h-6 w-6 text-gray-400">📱</div>
                <span className="text-sm font-semibold text-gray-600">Works on mobile</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">Fast setup</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Problem -> Solution Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
              <div className="lg:pr-8">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-indigo-600">The Problem</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Spreadsheets are messy
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Are you tired of copy-pasting into Word documents, losing track of who paid, and calculating taxes manually? Complex accounting software is overkill and spreadsheets are prone to errors.
                  </p>
                  <h2 className="text-base font-semibold leading-7 text-indigo-600 mt-8">The Solution</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    InvoiceFlow simplifies everything
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    We eliminate the chaos. Create clients, generate invoices, and track payments in a clean, intuitive interface designed for speed.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end lg:order-last">
                <div className="w-[48rem] max-w-none rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 sm:w-[57rem]">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-gray-100">
                    <span className="text-gray-400 font-medium">Comparison Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Features Section */}
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Core capabilities
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">

                {/* Feature 1: Client Management */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Users className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Client Management
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Store client details, including billing addresses and contact info, for quick reuse on future invoices.</p>
                    <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <span className="text-gray-400 text-sm">Client List Image</span>
                    </div>
                  </dd>
                </div>

                {/* Feature 2: Invoice Tracking */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <CreditCard className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Invoice Tracking
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Easily distinguish between Paid, Pending, and Draft invoices so you never miss a payment.</p>
                    <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <span className="text-gray-400 text-sm">Tracking Status Image</span>
                    </div>
                  </dd>
                </div>

                {/* Feature 3: PDF Export */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <FileText className="h-6 w-6" aria-hidden="true" />
                    </div>
                    PDF Export
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Generate professional PDF invoices instantly to email to your clients or keep for your records.</p>
                    <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <span className="text-gray-400 text-sm">PDF Preview Image</span>
                    </div>
                  </dd>
                </div>

              </dl>
            </div>
          </div>
        </div>

        {/* 4. Dashboard Overview Section */}
        <div className="bg-white py-24 sm:py-32 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-10">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Dashboard</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                At-a-glance financial health
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our dashboard aggregates your data into simple summary cards. Instantly see your Total Revenue, Pending Amounts, and Paid Invoices to make data-driven decisions.
              </p>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="bg-white rounded-md shadow-2xl overflow-hidden h-96 flex items-center justify-center border border-gray-200 w-full">
                  <span className="text-gray-400 font-medium">Full Width Dashboard Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Who It's For Section */}
        <div className="bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Target Audience</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Who is InvoiceFlow for?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Freelancers</h3>
                <p className="text-gray-300">Simplified billing for individuals who need to spend less time on admin and more time on work.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Consultants</h3>
                <p className="text-gray-300">Professional looking invoices that build trust with your high-value clients.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Small Businesses</h3>
                <p className="text-gray-300">Track multiple clients and invoices in one centralized system without the bloat.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Call to Action Section */}
        <div className="bg-indigo-600">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to take control of your billing?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                Join others who are simplifying their invoicing workflow today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 7. Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Terms of Service
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 InvoiceFlow. Contact: <a href="mailto:support@invoiceflow.com" className="hover:text-gray-900 underline">support@invoiceflow.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
