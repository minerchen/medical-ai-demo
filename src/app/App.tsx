import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grip, 
  Clock, 
  Monitor, 
  Hexagon, 
  User, 
  Plus, 
  Sparkles, 
  Zap, 
  Slash, 
  Paperclip, 
  Mic, 
  Send,
  Loader2
} from 'lucide-react';

const defaultReport = {
  diagnoses: [
    { label: "I.(a) 直接死亡原因", value: "呼吸衰竭", extra: "3天" },
    { label: "I.(b) 引起(a)的疾病或情况", value: "肺恶性肿瘤（右肺腺癌IV期）", extra: "2个月" },
    { label: "I.(c) 引起(b)的疾病或情况", value: "—" },
    { label: "II. 其他疾病诊断1", value: "恶性胸腔积液" },
    { label: "II. 其他疾病诊断2", value: "低蛋白血症" },
    { label: "II. 其他疾病诊断3", value: "—" }
  ],
  record: "患者因右肺腺癌IV期长期住院治疗，入院时已出现广泛胸膜转移及恶性胸腔积液，反复行胸腔穿刺引流。住院期间患者进行性呼吸困难加重，低氧血症持续恶化，予以高流量吸氧及对症支持治疗。患者家属知情病情后拒绝有创治疗，要求姑息治疗。死亡前3天患者出现意识模糊、血压下降，血氧饱和度最低降至75%，经积极对症处理后无改善，于2025年3月24日21时10分临床死亡。死亡原因判断为肺恶性肿瘤终末期导致呼吸循环衰竭。"
};

const patients = [
  { 
    id: 1, 
    name: '刘*勤10602967', 
    diagnosis: '肺恶性肿瘤（晚期）',
    report: {
      diagnoses: [
        { label: "I.(a) 直接死亡原因", value: "脓毒性休克（R57.8）", extra: "2月" },
        { label: "I.(b) 引起(a)的疾病或情况", value: "肺的其他疾患(肺感染)（J98.4）", extra: "79日" },
        { label: "I.(c) 引起(b)的疾病或情况", value: "脑梗死，未特指（I63.9）", extra: "6年" },
        { label: "I.(d) 引起(c)的疾病或情况", value: "特发性(原发性)高血压（I10）", extra: "20年" },
        { label: "II. 其他疾病诊断1", value: "非胰岛素依赖型糖尿病，伴有肾的并发症(Ⅱ型糖尿病)（E11.2）", extra: "数年" },
        { label: "II. 其他疾病诊断2", value: "其他癫痫（G40.9）", extra: "3年" }
      ],
      record: "既往有脑梗死6年余，遗留左侧肢体偏瘫、吞咽困难及认知障碍，长期鼻饲；合并高血压20余年、2型糖尿病伴糖尿病肾病III期、继发性癫痫3年。2025-11-28因\"左侧肢体无力6年余\"入院，入院后即发现肺部感染，痰培养检出耐碳青霉烯铜绿假单胞菌（CRPA），病情进行性加重。住院期间反复发生呼吸衰竭，2025-12-11突发氧饱和度骤降、意识丧失，行心肺复苏及气管插管后转入ICU，诊断为重症肺炎、脓毒性休克。虽经美罗培南、利奈唑胺、多黏菌素等联合抗感染及机械通气、CRRT支持治疗，仍出现急性肾损伤、凝血功能障碍（D-Dimer >10000μg/L，Fib<1g/L）、重度贫血及多器官功能衰竭。2026-02-13乳酸升至18.0mmol/L，循环难以维持。2026-02-15，01:54因脓毒性休克在院内死亡。其他病史：2型糖尿病伴肾病数年；高血压20年余；癫痫3年。"
    }
  },
  { 
    id: 3, 
    name: '石*山15023664', 
    diagnosis: '脑出血', 
    report: {
      diagnoses: [
        { label: "I.(a) 直接死亡原因", value: "神经源性休克（R57.8）", extra: "32日" },
        { label: "I.(b) 引起(a)的疾病或情况", value: "脑受压（G93.2）", extra: "33天" },
        { label: "I.(c) 引起(b)的疾病或情况", value: "大脑半球的脑内出血，未特指（I61.9）", extra: "33日" },
        { label: "I.(d) 引起(c)的疾病或情况", value: "特发性(原发性)高血压（I10）", extra: "数月" },
        { label: "II. 其他疾病诊断1", value: "动脉硬化性心脏病（I25.1）", extra: "3年" },
        { label: "II. 其他疾病诊断2", value: "肾恶性肿瘤（透明细胞性肾细胞癌）（C64.9）", extra: "1.5年" },
        { label: "II. 其他疾病诊断3", value: "肺的其他疾患(肺感染)（J98.4）", extra: "32日" }
      ],
      record: "既往有动脉硬化性心脏病3年余，2024年8月因左肾部分切除术确诊为透明细胞性肾细胞癌（pT1a期），术后未见复发；家属诉\"数月来血压升高\"，最高达140-160mmHg，平素未口服降压药物。2026-02-13因\"头痛2小时，意识不清1小时\"入院，头颅CT示左侧大脑半球多发急性血肿伴脑水肿、中线右移、脑疝形成，诊断为高血压性脑出血，急诊行颅内血肿清除术+去骨瓣减压术。术后持续昏迷，双侧瞳孔散大固定，无自主呼吸恢复迹象，符合不可逆性脑干损伤。住院期间继发肺部感染，反复调整抗感染方案，合并心力衰竭、下肢静脉血栓及电解质紊乱。2026-03-06起家属拒绝气管切开及强化干预，转为姑息支持治疗。病情进行性恶化，最终因脑出血后脑受压导致脑干功能衰竭，引发神经源性休克，于2026-03-17，03:35因神经源性休克院内死亡。其他病史：动脉硬化性心脏病3年余；肾透明细胞癌（2024年8月）；高血压数月。"
    }
  }
];

export default function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(1);
  const [interactions, setInteractions] = useState<{id: number, step: number}[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Handle patient selection and auto-send flow
  useEffect(() => {
    const initialId = Date.now();
    // 1. Reset chat and immediately start loading state
    setInteractions([{ id: initialId, step: 1 }]);
    
    // 2. Wait 5 seconds, then show results
    const timer = setTimeout(() => {
      setInteractions(prev => prev.map(i => i.id === initialId ? { ...i, step: 2 } : i));
    }, 5000);

    return () => clearTimeout(timer);
  }, [selectedPatientId]);

  // Handle manual trigger from button
  const handleGenerateCard = () => {
    const newId = Date.now();
    setInteractions(prev => [...prev, { id: newId, step: 1 }]);
    
    setTimeout(() => {
      setInteractions(prev => prev.map(i => i.id === newId ? { ...i, step: 2 } : i));
    }, 5000);
  };

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [interactions]);

  return (
    <div className="flex h-screen w-full bg-[#F0F2F5] font-sans overflow-hidden">
      
      {/* Left Sidebar - Patient List */}
      <div className="w-[220px] h-full bg-white flex flex-col border-r border-gray-100 shrink-0 z-10 shadow-sm relative">
        <div className="pt-5 pb-3 px-4">
          <h2 className="text-[14px] text-gray-500 font-medium tracking-wide">患者列表</h2>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {patients.map((patient) => {
            const isSelected = selectedPatientId === patient.id;
            return (
              <div
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className={`group cursor-pointer py-3 px-4 relative transition-colors ${
                  isSelected ? 'bg-[#EBF3FF]' : 'hover:bg-gray-50'
                }`}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1677FF] rounded-r-md"
                  ></motion.div>
                )}
                <div className="flex flex-col gap-1">
                  <span className={`text-[15px] font-semibold ${isSelected ? 'text-[#1677FF]' : 'text-gray-800'}`}>
                    {patient.name}
                  </span>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Area - Floating Hi小助 Card */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        
        {/* Container centered slightly to the right */}
        <div className="w-[640px] h-[85vh] max-h-[850px] bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.10)] flex flex-col overflow-hidden relative ml-8 xl:ml-24 border border-gray-100/50">
          
          {/* Card Header */}
          <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white shrink-0 relative z-20">
            {/* Left Icons */}
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-gray-600 transition-colors"><Grip className="w-4 h-4" /></button>
              <button className="hover:text-gray-600 transition-colors"><Clock className="w-4 h-4" /></button>
              <button className="hover:text-gray-600 transition-colors"><Monitor className="w-4 h-4" /></button>
              <button className="hover:text-gray-600 transition-colors"><Hexagon className="w-4 h-4" /></button>
            </div>
            
            {/* Center Brand */}
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[15px] font-bold bg-gradient-to-r from-[#1677FF] to-[#8B5CF6] bg-clip-text text-transparent tracking-wide">
                Hi小助
              </span>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-gray-600 transition-colors"><User className="w-[18px] h-[18px]" /></button>
              <button className="hover:text-gray-600 transition-colors"><Plus className="w-[18px] h-[18px]" /></button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 bg-white pb-6 scroll-smooth">
            
            <AnimatePresence mode="popLayout">
              {interactions.map((interaction) => (
                <React.Fragment key={interaction.id}>
                  {/* User Message */}
                  <motion.div 
                    layout
                    key={`user-msg-${interaction.id}`}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex justify-end w-full mt-4 first:mt-0"
                  >
                    <div className="bg-[#1677FF] text-white rounded-[12px] rounded-tr-[4px] px-4 py-3 max-w-[85%] shadow-sm">
                      <p className="text-[14px] leading-relaxed">
                        根据患者的病历情况生成致死的主要疾病诊断和死亡调查记录
                      </p>
                    </div>
                  </motion.div>

                  {/* System Loading Status */}
                  {interaction.step === 1 && (
                    <motion.div 
                      layout
                      key={`loading-msg-${interaction.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center w-full my-1"
                    >
                      <span className="text-gray-400 text-[12px] flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ✦ 正在查询患者病历情况...
                      </span>
                    </motion.div>
                  )}

                  {/* AI Reply Card Message */}
                  {interaction.step === 2 && (
                    <motion.div 
                      layout
                      key={`ai-msg-${interaction.id}`}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      className="flex justify-start w-full"
                    >
                      <div className="w-full bg-white rounded-[12px] rounded-tl-[4px] border border-gray-200 p-4 shadow-sm relative">
                    
                    {/* Block 1: 致死的主要疾病诊断 */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-3.5 bg-[#1677FF] rounded-full"></div>
                        <h3 className="text-[#1677FF] font-bold text-[14px]">致死的主要疾病诊断</h3>
                      </div>
                      
                      <div className="w-full text-[13px] border border-gray-200 rounded-[8px] overflow-hidden shadow-sm">
                        <div className="flex min-h-[40px] border-b border-gray-200 bg-[#F4F6F8] text-gray-700 font-bold text-[13px]">
                          <div className="w-[200px] shrink-0 py-2.5 px-4 leading-snug border-r border-gray-200 flex items-center">
                            致死的主要疾病诊断
                          </div>
                          <div className="flex-1 py-2.5 px-4 leading-snug flex justify-between items-center gap-3">
                            <span>疾病名称</span>
                            <span className="shrink-0">发病至死亡时间</span>
                          </div>
                        </div>
                        {patients.find(p => p.id === selectedPatientId)?.report.diagnoses.map((diag, idx) => (
                          <TableRow key={idx} index={idx} label={diag.label} value={diag.value} extra={diag.extra} />
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gray-100 my-4"></div>

                    {/* Block 2: 死亡调查记录 */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-3.5 bg-[#1677FF] rounded-full"></div>
                        <h3 className="text-[#1677FF] font-bold text-[14px]">死亡调查记录</h3>
                      </div>
                      <div className="text-gray-700 text-[14px] leading-[1.6] text-justify">
                        {patients.find(p => p.id === selectedPatientId)?.report.record}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="flex justify-end mt-4">
                      
                    </div>
                  </div>
                </motion.div>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
            
            {/* Scroll anchor */}
            <div ref={chatEndRef} className="h-1 shrink-0" />
          </div>

          {/* Card Bottom Input Area */}
          <div className="border-t border-gray-100 bg-white p-3 shrink-0 relative z-20 flex flex-col gap-3">
            
            {/* Persistent Quick Action Button */}
            <div className="flex px-1">
              <button 
                onClick={handleGenerateCard}
                className="bg-white border border-[#1677FF]/30 text-[#1677FF] hover:bg-blue-50 text-[13px] font-medium py-1.5 px-4 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                死亡报卡
              </button>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl border border-gray-100 focus-within:border-[#1677FF]/40 focus-within:bg-white transition-all overflow-hidden flex flex-col">
              <input 
                type="text" 
                placeholder="输入 '@' 唤起快捷指令" 
                className="w-full bg-transparent border-none outline-none px-4 pt-3 pb-2 text-[14px] text-gray-700 placeholder-gray-400"
              />
              <div className="flex items-center justify-between px-3 pb-2">
                <button className="flex items-center gap-1 text-[12px] text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-[6px] hover:bg-blue-100 transition-colors font-medium">
                  ✦ 快捷指令
                </button>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors p-1"></button>
                  <button className="hover:text-gray-600 transition-colors p-1"></button>
                  <button className="hover:text-gray-600 transition-colors p-1"></button>
                  <button className="hover:text-gray-600 transition-colors p-1"></button>
                  <button className="bg-[#1677FF] hover:bg-blue-600 text-white p-1.5 rounded-[6px] ml-1 transition-colors shadow-sm">
                    <Send className="w-4 h-4 translate-x-[1px] translate-y-[-1px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function TableRow({ label, value, extra, index }: { label: string; value: string; extra?: string, index?: number }) {
  return (
    <div className={`flex min-h-[40px] border-b border-gray-100 last:border-b-0 ${index !== undefined && index % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="w-[200px] shrink-0 text-gray-600 py-2.5 px-4 leading-snug border-r border-gray-100 bg-[#F4F6F8] font-medium text-[13px] flex items-center">
        {label}
      </div>
      <div className="flex-1 text-gray-900 py-2.5 px-4 leading-snug flex justify-between items-start gap-3 text-[13px]">
        <span className="font-medium text-gray-800 break-words">{value}</span>
        {extra && (
          <span className="text-gray-500 text-[12px] font-normal shrink-0 whitespace-nowrap bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-[4px]">
            {extra}
          </span>
        )}
      </div>
    </div>
  );
}