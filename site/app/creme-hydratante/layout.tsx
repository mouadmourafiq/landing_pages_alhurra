import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AL HURRA | كريم مرطب 50 غرام',
  description:
    'كريم AL HURRA المرطب 50 غرام لبشرة رطبة وناعمة ومريحة كل يوم.',
};

export default function HydratingCreamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

