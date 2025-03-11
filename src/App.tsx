import { Github, Instagram, Mail, Music, Coffee, GraduationCap, Plane, Cat, Guitar } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* Hero Section */}
      <section className="container mx-auto px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Привіт, я Ліля
          </h1>
          <p className="text-lg text-rose-700 leading-relaxed">
            Творча душа, що знаходить натхнення у музиці, мистецтві та ароматній каві. 
            Люблю створювати затишок та ділитися позитивом з оточуючими.
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/img/IMG_20250311_122116_231.jpg"
            alt="Profile" 
            className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-bold text-center text-rose-900 mb-12">Про мене</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cat className="w-8 h-8 text-rose-600" />,
                title: "Котяча мама",
                description: "Маю чудового пухнастого друга, який робить кожен день особливим"
              },
              {
                icon: <Guitar className="w-8 h-8 text-rose-600" />,
                title: "Гітаристка",
                description: "Граю на гітарі та знаходжу спокій у музиці"
              },
              {
                icon: <Music className="w-8 h-8 text-rose-600" />,
                title: "Хористка",
                description: "Співаю в хорі та насолоджуюсь гармонією голосів"
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-rose-600" />,
                title: "Студентка",
                description: "Навчаюсь комп'ютерним наукам, мрію стати UX/UI дизайнеркою"
              },
              {
                icon: <Plane className="w-8 h-8 text-rose-600" />,
                title: "Мандрівниця",
                description: "Досліджую світ та збираю незабутні враження"
              },
              {
                icon: <Coffee className="w-8 h-8 text-rose-600" />,
                title: "Бариста",
                description: "Створюю особливі кавові моменти для людей"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-rose-50 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-rose-900 mb-2">{item.title}</h3>
                <p className="text-rose-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-rose-900 mb-8">Зв'яжіться зі мною</h2>
        <div className="flex justify-center space-x-6">
          <a 
            href="mailto:zaichuk.liliia1122@vu.cdu.edu.ua" 
            className="p-3 bg-rose-100 rounded-full hover:bg-rose-200 transition-colors duration-300"
          >
            <Mail className="w-6 h-6 text-rose-600" />
          </a>
          <a 
            href="https://www.instagram.com/lilicha015l?igsh=MTA3OTA5c3JtZGs3MA==" 
            className="p-3 bg-rose-100 rounded-full hover:bg-rose-200 transition-colors duration-300"
          >
            <Instagram className="w-6 h-6 text-rose-600" />
          </a>
          <a 
            href="https://github.com/liliazaichuk" 
            className="p-3 bg-rose-100 rounded-full hover:bg-rose-200 transition-colors duration-300"
          >
            <Github className="w-6 h-6 text-rose-600" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;