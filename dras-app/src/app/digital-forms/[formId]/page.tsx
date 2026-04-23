
import React from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default async function DigitalFormPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  
  // Match the slugification logic in scripts/scaffold-forms.ts
  const slug = formId
    .replace(/^Форма_/, '')
    .replace(/_часть_/, '_part_')
    .replace(/[^a-zA-Z0-9_]/g, '');
    
  const componentName = `DigitalForm${slug}`;

  // Dynamically import the form component
  const FormComponent = dynamic(() => import(`@/components/forms/${componentName}`).catch(() => {
    return () => (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <h2 className="text-2xl font-bold">Компонент не найден</h2>
        <p className="mt-2 text-sm">Файл src/components/forms/${componentName}.tsx отсутствует.</p>
        <Link href="/navigator" className="mt-6 text-cyan-400 hover:underline">Вернуться к навигатору</Link>
      </div>
    );
  }), {
    loading: () => (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    )
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/navigator"
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} /> Навигатор
        </Link>
      </div>
      
      <FormComponent />
    </div>
  );
}
