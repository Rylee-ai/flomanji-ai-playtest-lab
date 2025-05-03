
import { jsPDF } from "jspdf";
import { AgentMessage, SimulationResult } from "@/types";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

/**
 * Utility class to handle exporting simulation logs in various formats
 */
export class SimulationExporter {
  /**
   * Export the simulation log as a PDF file
   * @param simulation The simulation result containing the log
   */
  public static exportToPdf(simulation: SimulationResult): void {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      const lineHeight = 7;
      let y = 15;
      
      // Add title
      doc.setFontSize(16);
      doc.text(`Simulation: ${simulation.scenario}`, 15, y);
      y += lineHeight * 2;
      
      // Add metadata
      doc.setFontSize(10);
      doc.text(`ID: ${simulation.id}`, 15, y);
      y += lineHeight;
      doc.text(`Date: ${new Date(simulation.timestamp).toLocaleString()}`, 15, y);
      y += lineHeight;
      doc.text(`Rounds: ${simulation.rounds}`, 15, y);
      y += lineHeight;
      doc.text(`Players: ${simulation.playerCount}`, 15, y);
      y += lineHeight*2;
      
      // Add log headers
      doc.setFontSize(12);
      doc.text("Simulation Log", 15, y);
      y += lineHeight;
      
      // Add log entries
      doc.setFontSize(10);
      simulation.log.forEach((message, index) => {
        // Check if we need to add a new page
        if (y > 270) {
          doc.addPage();
          y = 15;
        }
        
        // Format each message
        const sender = message.role === "Player" && message.playerIndex !== undefined
          ? `${message.role} ${message.playerIndex + 1}`
          : message.role;
          
        const round = message.metadata?.roundNumber 
          ? `(Round ${message.metadata.roundNumber})`
          : "";
          
        // Add message header with bold styling
        doc.setFont("helvetica", "bold");
        doc.text(`${sender} ${round}:`, 15, y);
        y += lineHeight;
        
        // Add message content with normal styling
        doc.setFont("helvetica", "normal");
        
        // Split long messages into multiple lines
        const contentLines = doc.splitTextToSize(message.content, 180);
        contentLines.forEach(line => {
          // Check if we need to add a new page before adding a line
          if (y > 270) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += lineHeight;
        });
        
        // Add space between messages
        y += lineHeight/2;
      });
      
      // Save the PDF
      doc.save(`simulation-log-${simulation.id}.pdf`);
      showSuccessToast("PDF Export Successful", "Simulation log has been exported as PDF");
    } catch (error) {
      console.error("Error exporting simulation to PDF:", error);
      showErrorToast("PDF Export Failed", error.message || "Could not export simulation log");
    }
  }
  
  /**
   * Export the simulation log as a Markdown file
   * @param simulation The simulation result containing the log
   */
  public static exportToMarkdown(simulation: SimulationResult): void {
    try {
      let markdown = `# Simulation: ${simulation.scenario}\n\n`;
      
      // Add metadata
      markdown += `- **ID:** ${simulation.id}\n`;
      markdown += `- **Date:** ${new Date(simulation.timestamp).toLocaleString()}\n`;
      markdown += `- **Rounds:** ${simulation.rounds}\n`;
      markdown += `- **Players:** ${simulation.playerCount}\n\n`;
      
      // Add outcome if available
      if (simulation.missionOutcome) {
        markdown += `- **Outcome:** ${simulation.missionOutcome}\n\n`;
      }
      
      // Add annotations if available
      if (simulation.annotations && simulation.annotations.trim().length > 0) {
        markdown += `## Notes\n\n${simulation.annotations}\n\n`;
      }
      
      // Add log entries
      markdown += `## Simulation Log\n\n`;
      
      simulation.log.forEach((message, index) => {
        const sender = message.role === "Player" && message.playerIndex !== undefined
          ? `${message.role} ${message.playerIndex + 1}`
          : message.role;
          
        const round = message.metadata?.roundNumber 
          ? `(Round ${message.metadata.roundNumber})`
          : "";
          
        markdown += `### ${sender} ${round}\n\n`;
        markdown += `${message.content}\n\n`;
      });
      
      // Create and download the file
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `simulation-log-${simulation.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showSuccessToast("Markdown Export Successful", "Simulation log has been exported as Markdown");
    } catch (error) {
      console.error("Error exporting simulation to Markdown:", error);
      showErrorToast("Markdown Export Failed", error.message || "Could not export simulation log");
    }
  }
}
