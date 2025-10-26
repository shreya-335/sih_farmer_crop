"use server"

import { generateText } from "ai"

interface ReportData {
  cropType: string
  damageType: string
  affectedArea: string
  dateOfDamage: string
  description: string
  weatherData: {
    rainfall: string
    temperature: string
    windSpeed: string
  }
  satelliteData: {
    ndvi: string
    coverage: string
    damagePattern: string
  }
}

export async function generateAIReport(reportData: ReportData) {
  const prompt = `You are an expert agricultural damage assessment specialist. Based on the following crop damage report data, generate a comprehensive professional damage assessment report.

Crop Information:
- Crop Type: ${reportData.cropType}
- Affected Area: ${reportData.affectedArea} acres
- Date of Damage: ${reportData.dateOfDamage}
- Damage Cause: ${reportData.damageType}
- Description: ${reportData.description}

Environmental Data:
- Rainfall: ${reportData.weatherData.rainfall}
- Temperature: ${reportData.weatherData.temperature}
- Wind Speed: ${reportData.weatherData.windSpeed}

Satellite Analysis:
- NDVI Index: ${reportData.satelliteData.ndvi}
- Field Coverage: ${reportData.satelliteData.coverage}
- Damage Pattern: ${reportData.satelliteData.damagePattern}

Please provide:
1. Executive Summary (2-3 sentences)
2. Damage Assessment Details (severity level, percentage loss estimate)
3. Contributing Factors Analysis
4. Recommendations for Future Prevention
5. Estimated Financial Loss

Format the response as a structured report with clear sections.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    return {
      success: true,
      report: text,
    }
  } catch (error) {
    console.error("Error generating report:", error)
    return {
      success: false,
      report: null,
      error: "Failed to generate AI report",
    }
  }
}
