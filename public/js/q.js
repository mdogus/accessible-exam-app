var qArr = [];
var i = 0;


qArr[++i] = {
    id: i,
    text: 'Öyle insanlar vardır ki çok iyi eğitim almalarına rağmen Türk dilinin kırlarında kör topal yürüyen insan olmaktan kurtulamazlar. Yukarıdaki cümlede geçen “dilin kırlarında kör topal yürümek’’ sözüyle anlatılmak istenen aşağıdaki-lerden hangisidir?' ,
    o1Text: 'Dilin kurallarına uymayıp anlam zenginliğini yansıtamamak' ,
    o2Text: 'Az sözle çok şey anlatabilmek' ,
    o3Text: 'Söz sanatlarını iyi kullanmak' ,
    o4Text: 'Dilin kurallarını bilen insan olmak' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Dostoyevski doğduğu günden ölüm anına kadar sürekli acının potasında yoğrulmuş bir yazardı. Bu cümledeki “acının potasında yoğrulmak” sözüyle anlatılmak istenen aşağıdakilerden hangisidir?' ,
    o1Text: 'Hayatını çektiği acılarla şekillendirmek' ,
    o2Text: 'Eserlerinde, acı çeken kahramanlara yer vermek' ,
    o3Text: 'Yazarlık hayatı boyunca çok acı çekmek' ,
    o4Text: 'Acı çekmeyi normal karşılamak' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Sıcaktan bunalmış, taze toprağa bulanmış köylüler; arklar, yataklar su ile dolmaya başladığı zaman, büyük bir bayram sevinci duyarlardı. Çocuklar sevinçlerinden bağrışırlar ama en küçükleri ayaklarını suya sokabilir veya kağıttan yapılmış kayıklar yüzdürebi-lirdi. Fakat arklara toprak düşürmemek için dikkat etmek, suyun yolunu kesmemek lazımdı. Kadınlar ve çocuklar, bahçelerde ağaçların altına serilirler ve ıslak, serin havayı zevkle ciğerlerine çekerlerdi. Kat kat örülmüş taş duvarların üzerinden komşu bahçelere hoş sesler yayılırdı. Bu parçanın anlatımında aşağıdakilerden hangisi yoktur?' ,
    o1Text: 'Değişik duyulardan yararlanma' ,
    o2Text: 'Tanımlamalarla söyleyişte yoğunluk sağlama' ,
    o3Text: 'Betimlemeye başvurma' ,
    o4Text: 'Amaç-sonuç cümlesine yer verme' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Artık sis daha da bastırmaya başladı. Her yer daha da karanlık. İstanbul’un denizden ilk görüntüsü görkemli diye anlatılır. Şimdi bana dehşet veriyor. İstanbul’un eteklerinde çırpındım yıllarca. Bazen o sisin İstanbul’un eteklerinden kalktığı da oldu. Ama tepesi hiç görünmedi.Bu parça ile ilgili olarak aşağıdakilerden hangisi söylenemez?' ,
    o1Text: 'insandan doğaya aktarma yapılmıştır' ,
    o2Text: 'Devrik cümle kullanılmıştır' ,
    o3Text: 'Anlatılanlar gözleme dayalıdır' ,
    o4Text: 'Öyküleme tekniği ile yazılmıştır' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Bir roman yazarken hatıralardan faydalanabilirsiniz. Hangi tarzda, hangi ölçüde faydalanacağınızı tercihlerinize göre belirleyebilirsiniz. Esasen geçmişteki her tecrübe, her gözlem, her tanıklık hatıradır. Bazen yazdıklarınız, yaşadıklarınızdan bile daha gerçek olabilir. Peyami Safa, 9. Hariciye Koğuşu için, “Yaşadığım kısımlar daha gerçek.” diyor. Gerçekliğin yansımaları hayatın akışı içinde kısmen gizli kalabilir yahut arka plana kayabilir. Bu parçanın anlatımında aşağıdakilerden hangilerinden yararlanılmıştır?' ,
    o1Text: 'Açıklama - tanık gösterme - benzetme' ,
    o2Text: 'Tartışma - karşılaştırma - tanımlama' ,
    o3Text: 'öyküleme - karşılaştırma - benzetme' ,
    o4Text: 'Açıklama - karşılaştırma - tanık gösterme' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: '(I) Başar Başarırın yeni öykü kitabı “Çıktığınız Hevesle İniniz” yazarın on altı yeni öyküsünü okuyucuyla buluşturuyor. <br>(II) Başarır, kitabında Türkçenin kaybolmakta olan inceliklerinin peşinden gitmeye çalışıyor. <br>(III) Geleneksel öykü kitabı formatına büyük bir yenilik getiren kitapta yer yer gereksiz tekrarlara da düşülmüş. <br>(IV) Ayrıca Başarır, “Çıktığınız Hevesle ininiz”de şiirle düz yazıyı etkileyici bir uyumla birleştirmiş. Yukarıda numaralanmış cümlelerin hangisinde sözü edilen eserle ilgili hem olumlu hem olumsuz eleştiri söz konusudur?' ,
    o1Text: 'I.' ,
    o2Text: 'II.' ,
    o3Text: 'III.' ,
    o4Text: 'IV.' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: '(I) Roman, kişisel veya toplumsal bir serüveni anlattığı için tarihe yakın düşer. (II) Olaylara bakarken tarih de roman da açıklama ve yorumlama yöntemlerinden yararlanır ancak ortaya çıkan metin farklı olur. (III) Farkı yaratan, daha doğrusu romanı tarihten ayıran nokta bakış açısıdır kuşkusuz. (IV) Roman da tarih de gerçeğe bakar ancak tarihçi gerçeğe bakarken nesnel olmak zorundadır. Bu parçada numaralı cümleler için aşağıdakiler-den hangisi söylenmez?' ,
    o1Text: 'I. cümlede yargı gerekçesiyle verilmiştir.' ,
    o2Text: 'II. cümlede karşılaştırma yapılmıştır.' ,
    o3Text: 'III. cümlede bir tespitte bulunulmuştur.' ,
    o4Text: 'IV. cümlede bir zorunluluktan söz edilmiştir.' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: '(I) Klasik müzik dünyasının önde gelen aktörlerinin yaşamları ve kariyerlerine odaklanan belgesel yapımlara oldum olası özel bir ilgi duymuşumdur. (II) Bu insanların sahne dışındaki yaşamları neye benzer, sanat ve kariyerleri hakkında ne düşünürler, meslektaşları ve eleştirmenlerin onlar hakkındaki izlenimleri nasıldır? (III) Bu soruların yanıtlarını bulabilmek için izlerim bu tip belgeselleri. (IV) Yazılı söyleşilerde bulamaz mıyım bu soruların yanıtlarını? Bu parçadaki numaralanmış cümlelerle ilgili olarak aşağıda verilenlerden hangisi yanlıştır?' ,
    o1Text: 'I. cümlede, kişisel bir özellikten bahsedilmiştir' ,
    o2Text: 'II. cümlede, ele alınan konuyla ilgili sorular sorulmuştur.' ,
    o3Text: 'III. cümlede, yapılan bir davranışın gerekçesi belirtilmiştir.' ,
    o4Text: 'IV. cümlede, söyleşinin işlevinde gerçekleşen bir değişiklik ortaya konmuştur.' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Sıcaktan bunalmış, taze toprağa bulanmış köylüler; arklar, yataklar su ile dolmaya başladığı zaman, büyük bir bayram sevinci duyarlardı. Çocuklar sevinçlerinden bağrışırlar ama en küçükleri ayaklarını suya sokabilir veya kağıttan yapılmış kayıklar yüzdürebi-lirdi. Fakat arklara toprak düşürmemek için dikkat etmek, suyun yolunu kesmemek lazımdı. Kadınlar ve çocuklar, bahçelerde ağaçların altına serilirler ve ıslak, serin havayı zevkle ciğerlerine çekerlerdi. Kat kat örülmüş taş duvarların üzerinden komşu bahçelere hoş sesler yayılırdı.Bu parçanın anlatımında aşağıdakilerden hangisi yoktur?' ,
    o1Text: 'Değişik duyulardan yararlanma' ,
    o2Text: 'Tanımlamalarla söyleyişte yoğunluk sağlama' ,
    o3Text: 'Betimlemeye başvurma' ,
    o4Text: 'Amaç-sonuç cümlesine yer verme' ,
    answer: undefined,
    marked: false
};
qArr[++i] = {
    id: i,
    text: 'Abraham Lincoln, kabineye atanması için önerilen biri hakkında yardımcılarına: “Onun yüzünü hiç beğenmiyorum.” dediğinde, yardımcılarından itiraz sesleri yükselir: “Aman, efendim! insan, yüzüyle doğar, ondan sorumlu tutulamaz ki.” Lincoln, itirazlara şu cümleyle cevap verir: “İnsan, kırkından sonra yüzünden sorumludur.” Lincoln, bu sözüyle insanın doğuştan kazandığı karakterini ve iç dünyasını mecburen yüzüne yansıttığını fakat bunu — . Bu parçayı aşağıdakilerden hangisiyle sürdürmek uygun olur?' ,
    o1Text: 'anlamanın sezgi gücü gerektirdiğini ortaya koymaktadır.' ,
    o2Text: 'açıkça belli etmenin insana çok şey kaybettirebi-leceği gerçeğini dile getirmektedir.' ,
    o3Text: 'doğuracağı sonuçları hesaba katarak gizlemesi gerektiğini iletmektedir.' ,
    o4Text: 'herkesten başarıyla gizleyebilmesinin hiç de kolay olmadığını anlatmaktadır.' ,
    answer: undefined,
    marked: false
};
