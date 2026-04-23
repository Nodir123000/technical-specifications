
'use server';

import fs from 'fs';
import path from 'path';

/**
 * Fetches the content of a specific form from the regulatory documentation.
 */
export async function getFormContent(appendixId: string, formId: string) {
  try {
    const filePath = path.join(
      "D:\\Технические задания\\01_Нормативка\\Внутренние_регламенты\\260",
      appendixId,
      `${formId}.md`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`Form not found at ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return {
      success: true,
      content,
      path: filePath
    };
  } catch (error: any) {
    console.error('Error fetching form content:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Saves a digital form submission to a local JSON file (Standalone Mode).
 */
export async function saveFormSubmission(appendixId: string, formId: string, data: any) {
  try {
    const storageDir = path.join(process.cwd(), 'src/data/submissions');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    const submissionId = `SUB-${Date.now()}`;
    const filePath = path.join(storageDir, `${submissionId}.json`);
    
    const submission = {
      id: submissionId,
      form_id: formId,
      appendix_id: appendixId,
      data: data,
      status: 'draft',
      created_at: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));

    return {
      success: true,
      id: submissionId
    };
  } catch (error: any) {
    console.error('Error saving form submission:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
