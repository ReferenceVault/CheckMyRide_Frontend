export default function Disclaimer() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded shadow-lg overflow-hidden">
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-[#1f2a37] mb-4">Inspection Report Disclaimer</h2>
        
        <p className="text-[#64748b] mb-6">
          This inspection report provides a professional assessment of the vehicle's condition at the time of inspection. By using this report, you acknowledge and agree to the following terms:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Subjective Assessment</h3>
            <p className="text-[#64748b] text-sm">
              The ratings and evaluations in this report represent the inspector's professional opinion based on visual inspection and available testing methods. Different inspectors may provide varying assessments of the same components.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Point-in-Time Evaluation</h3>
            <p className="text-[#64748b] text-sm">
              This report reflects the vehicle's condition only at the time of inspection. Vehicle conditions can change rapidly, and components functioning properly during inspection may fail shortly thereafter.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Limited Scope</h3>
            <p className="text-[#64748b] text-sm">
              Our inspection is non-invasive and does not include disassembly of components, destructive testing, or specialized equipment beyond standard diagnostic tools. Hidden defects, intermittent issues, or problems not apparent during inspection may exist and are not covered by this report.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Purchase Recommendations</h3>
            <p className="text-[#64748b] text-sm">
              Any purchase recommendations reflect our assessment of mechanical condition only and do not account for your specific needs, budget constraints, intended use, or other personal factors relevant to your purchasing decision.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">No Warranty or Guarantee</h3>
            <p className="text-[#64748b] text-sm">
              This report does not constitute a warranty, guarantee, or certification of any kind regarding the vehicle's condition, performance, safety, or future reliability. CheckMyRide is not responsible for repair costs, diminished value, or any issues that may arise after the inspection or purchase.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Not a Substitute for Other Reports</h3>
            <p className="text-[#64748b] text-sm">
              This mechanical inspection report is not a substitute for a comprehensive vehicle history report (such as Carfax or AutoCheck), emissions testing, safety recall investigation, or manufacturer-specific diagnostics, all of which should be obtained separately.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1f2a37] mb-2">Safety Standard Certificate Requirement</h3>
            <p className="text-[#64748b] text-sm">
              CheckMyRide is not licensed to offer a Safety Standard Certificate or conduct official safety inspection reports. Our services help you identify potential issues before purchase but do not replace the requirement for a Safety Standard Certificate, which is mandatory for registering a vehicle in Ontario and other jurisdictions. You must obtain a valid Safety Standard Certificate from a licensed inspection facility to complete vehicle registration.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded">
          <p className="text-[#64748b] text-sm">
            <strong className="text-[#1f2a37]">Important:</strong> CheckMyRide strives to provide accurate, thorough, and professional inspections. However, we cannot be held liable for purchasing decisions made based on this report. We recommend that buyers use this report as one of several evaluation tools in their decision-making process, along with test drives, vehicle history reports, and consultation with trusted automotive professionals.
          </p>
        </div>

        <p className="mt-6 text-[#64748b] text-sm italic">
          By accepting this report, you acknowledge that you have read, understood, and agreed to these terms and limitations.
        </p>
      </div>
    </div>
  );
}

