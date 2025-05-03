
import { jsPDF } from "jspdf";
import { AgentMessage, SimulationResult } from "@/types";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

// Define options for export content customization
export interface ExportOptions {
  includeLog: boolean;
  includeCriticFeedback: boolean;
  includeAnnotations: boolean;
  includeTrainingStats: boolean;
  includeMetadata: boolean;
}

// Default export options
export const defaultExportOptions: ExportOptions = {
  includeLog: true,
  includeCriticFeedback: false,
  includeAnnotations: false,
  includeTrainingStats: false,
  includeMetadata: true,
};

/**
 * Utility class to handle exporting simulation logs in various formats
 */
export class SimulationExporter {
  /**
   * Export the simulation log as a PDF file
   * @param simulation The simulation result containing the log
   * @param options Export content options
   */
  public static exportToPdf(simulation: SimulationResult, options: ExportOptions = defaultExportOptions): void {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      const lineHeight = 7;
      let y = 15;
      
      // Add title
      doc.setFontSize(16);
      doc.text(`Simulation: ${simulation.scenario}`, 15, y);
      y += lineHeight * 2;
      
      // Add metadata if selected
      if (options.includeMetadata) {
        doc.setFontSize(10);
        doc.text(`ID: ${simulation.id}`, 15, y);
        y += lineHeight;
        doc.text(`Date: ${new Date(simulation.timestamp).toLocaleString()}`, 15, y);
        y += lineHeight;
        doc.text(`Rounds: ${simulation.rounds}`, 15, y);
        y += lineHeight;
        doc.text(`Players: ${simulation.playerCount}`, 15, y);
        y += lineHeight*2;
        
        if (simulation.missionOutcome) {
          doc.text(`Outcome: ${simulation.missionOutcome}`, 15, y);
          y += lineHeight;
        }
      }
      
      // Add annotations if selected
      if (options.includeAnnotations && simulation.annotations && simulation.annotations.trim().length > 0) {
        doc.setFontSize(12);
        doc.text("Notes & Annotations", 15, y);
        y += lineHeight;
        
        doc.setFontSize(10);
        const annotationLines = doc.splitTextToSize(simulation.annotations, 180);
        annotationLines.forEach(line => {
          if (y > 270) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += lineHeight;
        });
        y += lineHeight;
      }
      
      // Add critic feedback if selected
      if (options.includeCriticFeedback && simulation.criticFeedback) {
        // Check if we need to add a new page
        if (y > 240) {
          doc.addPage();
          y = 15;
        }
        
        doc.setFontSize(12);
        doc.text("Critic Feedback", 15, y);
        y += lineHeight;
        
        doc.setFontSize(10);
        const feedbackLines = doc.splitTextToSize(simulation.criticFeedback, 180);
        feedbackLines.forEach(line => {
          if (y > 270) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += lineHeight;
        });
        y += lineHeight;
      }
      
      // Add training stats if selected
      if (options.includeTrainingStats && simulation.trainingData) {
        // Check if we need to add a new page
        if (y > 240) {
          doc.addPage();
          y = 15;
        }
        
        doc.setFontSize(12);
        doc.text("Training Statistics", 15, y);
        y += lineHeight;
        
        doc.setFontSize(10);
        doc.text(`Success Rate: ${Math.round(simulation.trainingData.statistics.successRate * 100)}%`, 15, y);
        y += lineHeight;
        doc.text(`Average Rounds: ${simulation.trainingData.statistics.averageRounds}`, 15, y);
        y += lineHeight;
        
        // Add key decision points
        if (simulation.trainingData.statistics.keyDecisionPoints.length > 0) {
          y += lineHeight;
          doc.text("Key Decision Points:", 15, y);
          y += lineHeight;
          
          simulation.trainingData.statistics.keyDecisionPoints.slice(0, 5).forEach(point => {
            if (y > 270) {
              doc.addPage();
              y = 15;
            }
            doc.text(`Round ${point.round}: ${point.description}`, 15, y);
            y += lineHeight;
          });
        }
        
        y += lineHeight;
      }
      
      // Add log entries if selected
      if (options.includeLog) {
        // Check if we need to add a new page
        if (y > 240) {
          doc.addPage();
          y = 15;
        }
        
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
      }
      
      // Save the PDF
      doc.save(`simulation-${simulation.id}.pdf`);
      showSuccessToast("PDF Export Successful", "Simulation report has been exported as PDF");
    } catch (error) {
      console.error("Error exporting simulation to PDF:", error);
      showErrorToast("PDF Export Failed", error.message || "Could not export simulation report");
    }
  }
  
  /**
   * Export the simulation log as a Markdown file
   * @param simulation The simulation result containing the log
   * @param options Export content options
   */
  public static exportToMarkdown(simulation: SimulationResult, options: ExportOptions = defaultExportOptions): void {
    try {
      let markdown = `# Simulation: ${simulation.scenario}\n\n`;
      
      // Add metadata if selected
      if (options.includeMetadata) {
        markdown += `- **ID:** ${simulation.id}\n`;
        markdown += `- **Date:** ${new Date(simulation.timestamp).toLocaleString()}\n`;
        markdown += `- **Rounds:** ${simulation.rounds}\n`;
        markdown += `- **Players:** ${simulation.playerCount}\n\n`;
        
        // Add outcome if available
        if (simulation.missionOutcome) {
          markdown += `- **Outcome:** ${simulation.missionOutcome}\n\n`;
        }
      }
      
      // Add annotations if selected
      if (options.includeAnnotations && simulation.annotations && simulation.annotations.trim().length > 0) {
        markdown += `## Notes\n\n${simulation.annotations}\n\n`;
      }
      
      // Add critic feedback if selected
      if (options.includeCriticFeedback && simulation.criticFeedback) {
        markdown += `## Critic Feedback\n\n${simulation.criticFeedback}\n\n`;
      }
      
      // Add training stats if selected
      if (options.includeTrainingStats && simulation.trainingData) {
        markdown += `## Training Statistics\n\n`;
        markdown += `- **Success Rate:** ${Math.round(simulation.trainingData.statistics.successRate * 100)}%\n`;
        markdown += `- **Average Rounds:** ${simulation.trainingData.statistics.averageRounds}\n\n`;
        
        if (simulation.trainingData.statistics.keyDecisionPoints.length > 0) {
          markdown += `### Key Decision Points\n\n`;
          simulation.trainingData.statistics.keyDecisionPoints.forEach(point => {
            markdown += `- **Round ${point.round}:** ${point.description}\n`;
          });
          markdown += `\n`;
        }
      }
      
      // Add log entries if selected
      if (options.includeLog) {
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
      }
      
      // Create and download the file
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `simulation-${simulation.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showSuccessToast("Markdown Export Successful", "Simulation report has been exported as Markdown");
    } catch (error) {
      console.error("Error exporting simulation to Markdown:", error);
      showErrorToast("Markdown Export Failed", error.message || "Could not export simulation report");
    }
  }
}
