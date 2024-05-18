const VOCABS = {
  'en': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  'ar': 'ءآأؤإئابةتثجحخدذرزسشصضطظعغػؼؽؾؿـفقكلمنهوىيٱپژڤکگی٠١٢٣٤٥٦٧٨٩0123456789'
};

export function detectLanguage(word: string): 'en' | 'ar' {
  const enSet = new Set(VOCABS['en']);
  const arSet = new Set(VOCABS['ar']);

  const wordSet = new Set(word);
  const interEn = new Set([...wordSet].filter(x => enSet.has(x)));
  const interAr = new Set([...wordSet].filter(x => arSet.has(x)));

  return interEn.size >= interAr.size ? 'en' : 'ar';
}
