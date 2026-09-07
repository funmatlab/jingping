// script.js - 胡敬平教授个人网页交互脚本

document.addEventListener('DOMContentLoaded', function () {
    // ============ 移动端导航切换 ============
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            navList.classList.toggle('open');
        });
    }

    // ============ 折叠面板（教学大纲） ============
    document.querySelectorAll('.accordion-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetId = btn.getAttribute('data-accordion');
            const content = document.getElementById(targetId);
            if (content) {
                const isCollapsed = content.classList.toggle('collapsed');
                btn.textContent = isCollapsed ? '查看教学大纲 ▸' : '收起教学大纲 ▾';
            }
        });
    });

    // 初始状态：折叠所有大纲
    document.querySelectorAll('.accordion-content').forEach(function (content) {
        content.classList.add('collapsed');
    });
    document.querySelectorAll('.accordion-btn').forEach(function (btn) {
        btn.textContent = '查看教学大纲 ▸';
    });

    // ============ 论文数据 ============
    const publicationsData = {
        2026: [
            { num: 278, authors: 'D. K. Qian, Q. Zhu, M. J. Yuan, Z. M. Xu, J. W. Zhang, N. Li, M. Peng, L. Q. Cao, J. Y. Gong, J. P. Hu, H. J. Hou, J. K. Yang, B. E. Logan', title: 'Electrochemical chlorination byproducts (ECBPs): A potential blind spot in electrochemical treatment of waste activated sludge', journal: 'Journal of Hazardous Materials, 2026, 514, 142623', doi: '10.1016/j.jhazmat.2026.142623' },
            { num: 277, authors: 'Y. Zheng, Z. W. Dai, F. Yang, Z. Y. Li, G. Hu, S. Liang, W. B. Yu, S. S. Yuan, H. B. Duan, L. Huang, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Advanced strategies for selective lithium extraction from spent lithium-ion battery cathodes', journal: 'Resources, Conservation and Recycling, 2026, 227, 108756', doi: '10.1016/j.resconrec.2025.108756' },
            { num: 276, authors: 'L. M. Liu, J. L. Luo, L. Y. Xu, J. J. Zhou, Y. R. Mei, J. P. Hu, H. J. Hou, K. H. Xu, J. K. Yang', title: 'Mechanochemically-induced deep eutectic solvent formation for selective lithium recovery from spent lithium-ion batteries at room temperature', journal: 'Journal of Environmental Chemical Engineering, 2026, 14 (1), 120819', doi: '10.1016/j.jece.2025.120819' },
            { num: 275, authors: 'W. J. Qin, H. Zhong, J. P. Hu, W. Luo, Z. Shao, H. J. Hou, Z. Z. Liu, X. T. Zhang, S. Liang, J. K. Yang', title: 'Explainable AutoML-driven surface water quality classification with key indicators identification', journal: 'Journal of Hydrology, 2026, 665, 134634', doi: '10.1016/j.jhydrol.2025.134634' },
            { num: 274, authors: 'X. R. Yang, Q. B. Zheng, L. S. Wu, J. P. Hu, H. J. Hou, G. Y. Li, T. C. An, J. K. Yang', title: 'Ligand Coordination Directing High-Valent Iron-Oxo Reactivity for Pathway-Selective Pollutant Degradation', journal: 'Environmental Science & Technology, 2026, 60 (3), 2728–2741', doi: '10.1021/acs.est.5c10288' },
            { num: 273, authors: 'W. Luo, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Automatic and precise segmentation of gas chromatographic peaks by temporal semantic segmentation for prolonged monitoring of volatile organic compounds', journal: 'Journal of Chromatography A, 2026, 1767, 466650', doi: '10.1016/j.chroma.2025.466650' },
            { num: 272, authors: 'J. J. Zhou, H. X. Yu, Y. R. Mei, L. Y. Xu, L. M. Liu, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Green and selective recovery of lithium by phosphate based leaching system from spent lithium iron phosphate batteries', journal: 'Waste Management, 2026, 209, 115196', doi: '10.1016/j.wasman.2025.115196' },
            { num: 271, authors: 'Y. Y. Zheng, Y. Y. Du, J. Q. Li, Z. K. Liu, Y. T. Wu, Z. Mayu, L. Y. Lu, J. P. Hu, H. J. Hou, Q. Zhu', title: 'Efficient mineralization of azo dye in a Nd-doped TiO2 photoanode-coupled microbial fuel cell: Performance, microbiology and mechanism', journal: 'Separation and Purification Technology, 2026, 388, 136745', doi: '10.1016/j.seppur.2026.136745' },
            { num: 270, authors: 'Y. Zheng, Z. W. Dai, Z. Y. Li, G. Hu, S. Liang, W. B. Yu, S. S. Yuan, H. B. Duan, L. Huang, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Synergistic valorization of spent lithium-ion battery electrodes: anode graphite derived lamellar graphene oxide membranes for selective lithium recovery from cathode leachate', journal: 'Journal of Materials Chemistry A, 2026', doi: '10.1039/d6ta01119e' },
            { num: 269, authors: '胡敬平，梅延润，邓浩，徐倩，徐璐瑶，刘龙敏，周晶晶，侯慧杰，杨家宽', title: '一种从废旧锂离子电池中回收锂盐并制备磷酸锰铁锂正极材料的方法（发明专利）', journal: '中国，专利号：ZL202410616152.8', doi: '' },
            { num: 268, authors: '宋晓玲，胡敬平，徐盼盼，汤建建，梁智霖，罗维，黄东，杨忠，侯慧杰，刘冰川', title: '一种基于仿生算法的固体废物优先消纳驱动的水泥配料方法（发明专利）', journal: '中国，专利号：ZL202110639138.6', doi: '' },
            { num: 267, authors: '胡敬平，梁智霖，武龙胜，杨小容，汤建建，邓浩，徐倩，侯慧杰，杨家宽', title: '一种废旧锂离子电池正极材料浸出液除杂并直接制备再生正极材料的方法（发明专利）', journal: '中国，专利号：ZL202210938734.9', doi: '' }
        ],
        2025: [
            { num: 266, authors: 'R. Chen, Z. L. Liang, J. J. Tang, X. R. Yang, L. S. Wu, S. J. Chen, X. Gu, J. P. Hu, H. J. Hou, J. K. Yang', title: 'One-Pot Cathode Regeneration from Spent Lithium-Ion Batteries via Persulfate-Induced Lattice Destruction', journal: 'ACS Sustainable Chemistry & Engineering, 2025, 13 (51), 22053–22063', doi: '10.1021/acssuschemeng.5c09673' },
            { num: 265, authors: 'S. G. Hu, P. Xu, Q. Zhu, J. K. Yang, J. Yu, Z. Q. Chen, J. P. Hu, H. J. Hou', title: 'Activation of peroxymonosulfate by Fenton-conditioned sludge-derived biochar for efficient degradation and detoxification of sulfamethoxazole: Reactive oxygen species dominated process', journal: 'Environmental Research, 2025, 286, 122637', doi: '10.1016/j.envres.2025.122637' },
            { num: 264, authors: 'R. Chen, H. Deng, Q. Xu, J. J. Tang, Z. L. Liang, L. S. Wu, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Manipulation of manganese oxidation states for hydrothermal recycling of cathode materials from spent lithium-ion batteries', journal: 'Electrochimica Acta, 2025, 541, 147262', doi: '10.1016/j.electacta.2025.147262' },
            { num: 263, authors: 'M. K. Fan, K. Zhang, X. Gu, Y. R. Mei, R. Chen, J. P. Hu, H. J. Hou, J. K. Yang', title: 'MoS₂ nanosheets engineered with recycled cobalt for enhanced activation of peroxymonosulfate', journal: 'Chemical Engineering Journal, 2025, 521, 166654', doi: '10.1016/j.cej.2025.166654' },
            { num: 262, authors: 'L. Y. Xu, X. Han, J. P. Hu, H. J. Hou, L. M. Liu, J. J. Zhou, Y. R. Mei, R. Chen, J. K. Yang', title: 'Selective Recovery of Lithium from Spent Lithium-Ion Batteries via Sulfite-Assisted Reduction Roasting', journal: 'Energy & Fuels, 2025, 39 (38), 18684–18693', doi: '10.1021/acs.energyfuels.5c03163' },
            { num: 261, authors: 'J. S. Sin, J. J. Tang, Z. L. Liang, L. S. Wu, L. Liu, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Efficient Lithium Extraction from a Spent Ternary Lithium-Ion Battery by Redox-Mediated Selective Leaching', journal: 'ACS Sustainable Chemistry & Engineering, 2025, 13 (33), 13667–13678', doi: '10.1021/acssuschemeng.5c06667' },
            { num: 260, authors: 'W. Luo, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Automatic and precise identification of volatile organic compounds from gas chromatography in prolonged atmospheric monitoring', journal: 'Journal of Chromatography A, 2025, 1754, 466035', doi: '10.1016/j.chroma.2025.466035' },
            { num: 259, authors: 'Y. R. Mei, R. Chen, Z. Shao, W. J. Qin, L. Y. Xu, L. M. Liu, J. J. Zhou, J. P. Hu, H. J. Hou, L. X. Yuan, J. K. Yang', title: 'Novel Upcycling of Mixed Spent Cathodes Toward High Energy Density LiMnₓFe₁₋ₓPO₄ Cathode Material', journal: 'Advanced Functional Materials, 2025, 35 (31)', doi: '10.1002/adfm.202507185' },
            { num: 258, authors: 'W. Luo, L. M. Liu, J. P. Hu, H. J. Hou, H. Y. Hu, J. K. Yang', title: 'Optimization of industrial waste composition for eco-cement production using machine learning with meta-heuristic method', journal: 'Resources, Conservation and Recycling, 2025, 220, 108328', doi: '10.1016/j.resconrec.2025.108328' },
            { num: 257, authors: 'Y. F. Sun, P. Zhang, Y. Ke, L. Q. Cao, J. K. Yang, S. Liang, K. K. Xiao, J. P. Hu, H. J. Hou', title: 'Lead immobilization in fly ash-based geopolymers: The role of microwave irradiation and chemical forms', journal: 'Construction and Building Materials, 2025, 481, 141557', doi: '10.1016/j.conbuildmat.2025.141557' },
            { num: 256, authors: 'J. S. Sin, Q. Xu, H. Deng, J. J. Tang, Z. L. Liang, L. S. Wu, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Coupling Mechanochemistry with Advanced Oxidation and Chelation for Sustainable Recovery of Spent Ternary Lithium-Ion Batteries', journal: 'ACS Sustainable Chemistry & Engineering, 2025, 13 (22), 8424–8434', doi: '10.1021/acssuschemeng.5c02538' },
            { num: 255, authors: 'S. J. Chen, X. Y. Ding, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Activation of peroxymonosulfate by iron phthalocyanine loaded on MoS2 for efficient degradation of carbamazepine', journal: 'Materials Today Chemistry, 2025, 45, 102625', doi: '10.1016/j.mtchem.2025.102625' },
            { num: 254, authors: 'Y. T. Qiao, Q. Q. Zhang, Y. S. Wang, J. Yu, Z. Q. Chen, J. K. Yang, J. P. Hu, H. J. Hou', title: 'One-step pyrolysis synthesis of C/Bi4O5Br2 nanocomposites for simultaneous electrochemical detection of Cd2+, Pb2+, and Zn2+ with high selectivity and sensitivity', journal: 'Sensors and Actuators B: Chemical, 2025, 427, 137169', doi: '10.1016/j.snb.2024.137169' },
            { num: 253, authors: 'W. J. Qin, H. J. Hou, S. Gao, Y. R. Mei, L. S. Wu, S. Liang, J. P. Hu, J. K. Yang', title: 'Suppression of interference from dissolved organic matter using anionic surfactant for electrochemical detection of heavy metals', journal: 'Electrochimica Acta, 2025, 514, 145641', doi: '10.1016/j.electacta.2025.145641' },
            { num: 252, authors: 'Q. Zhu, Y. Y. Du, Y. Y. Zheng, Z. Y. Hu, Z. K. Liu, J. P. Hu, H. J. Hou', title: 'Quorum quenching inhibits the formation and electroactivity of electrogenic biofilm by weakening intracellular c-di-GMP and extracellular AHL-mediated signal communication', journal: 'Environmental Research, 2025, 266, 120604', doi: '10.1016/j.envres.2024.120604' },
            { num: 251, authors: 'S. Chen, F. Yang, S. Liang, M. X. Wen, Z. K. Zou, S. S. Yuan, H. B. Duan, W. B. Yu, J. P. Hu, J. K. Yang', title: 'Ion Transport Channels Created by Anion Exchange Resin in Four-Chamber Flow Electrode Capacitive Deionization Enable Efficient Phosphorus Removal', journal: 'ACS ES&T Engineering, 2025, 5 (4), 899–909', doi: '10.1021/acsestengg.4c00727' },
            { num: 250, authors: 'Y. Ke, S. Liang, H. B. Duan, J. D. Quan, X. W. Li, H. J. Hou, J. P. Hu, Y. Yang, X. Liu, Y. B. Zuo, J. K. Yang', title: 'Insights into solidification mechanism of Cr(III) and Cr(VI) in chromite ore processing residue via composite geopolymers synthesized from calcined red mud and granulated blast furnace slag', journal: 'Journal of Hazardous Materials, 2025, 496, 139185', doi: '10.1016/j.jhazmat.2025.139185' },
            { num: 249, authors: 'G. Hu, Z. Y. Li, Q. F. Zou, S. F. Zhou, S. Liang, L. Huang, H. B. Duan, J. P. Hu, H. J. Hou, L. Xu, C. Chen, J. Tang, J. K. Yang', title: 'Facile Recovery of Lead in Discarded Perovskite Solar Cells via Ultrasonic Water Leaching', journal: 'Environmental Science & Technology Letters, 2025, 12 (8), 1062–1068', doi: '10.1021/acs.estlett.4c00735' },
            { num: 246, authors: '胡敬平，秦文杰，仲恒，侯慧杰，杨家宽', title: '一种耦合因果发现与深度学习的水质预测方法及系统（发明专利申请）', journal: '中国，申请号：CN202511972932.7', doi: '' },
            { num: 245, authors: '杨家宽，郑莹，胡敬平，黄亮，梁莎，周世发，胡广，李朝阳，杨帆，侯慧杰', title: '一种以膨化石墨为原料制备单层或少层石墨烯的方法（发明专利）', journal: '中国，专利号：ZL202411636572.9', doi: '' },
            { num: 244, authors: '胡敬平，罗维，侯慧杰，杨家宽', title: '一种挥发性有机化合物色谱峰保留时间的预测方法及系统（发明专利）', journal: '中国，专利号：ZL202411860637.8', doi: '' }
        ],
        2024: [
            { num: 243, authors: 'Y. T. Qiao, Q. Q. Zhang, J. Yu, Z. Q. Chen, J. K. Yang, J. P. Hu, H. J. Hou', title: 'Synergistic photoelectrochemical detection of Cd²⁺ with carbon-bismuth oxybromide composites: Mechanistic insights from DFT calculations', journal: 'Journal of Alloys and Compounds, 2024, 1008, 176556', doi: '10.1016/j.jallcom.2024.176556' },
            { num: 242, authors: 'Z. M. Xu, Y. Q. Wu, Q. Zhu, D. K. Qian, M. J. Yuan, J. Yu, Z. Q. Chen, J. K. Yang, J. P. Hu, H. J. Hou', title: 'Effects of potassium-mediated electrical communication inhibition on nitrogen removal in microbial fuel cells', journal: 'Environmental Research, 2024, 262, 119822', doi: '10.1016/j.envres.2024.119822' },
            { num: 241, authors: 'E. Leburu, Y. T. Qiao, Y. S. Wang, J. K. Yang, S. Liang, W. B. Yu, S. S. Yuan, H. B. Duan, L. Huang, J. P. Hu, H. J. Hou', title: 'Flexible electronics for heavy metal ion detection in water: a comprehensive review', journal: 'Biomedical Microdevices, 2024, 26 (3), 30', doi: '10.1007/s10544-024-00710-5' },
            { num: 240, authors: 'Y. Zheng, Z. Yang, Z. Y. Li, G. Hu, S. Liang, W. B. Yu, S. S. Yuan, H. B. Duan, L. Huang, J. P. Hu, H. J. Hou, J. K. Yang', title: 'Environmentally Friendly Recovery of Li₂CO₃ from Spent Lithium-Ion Batteries by Oxidation and Selective Leaching Process', journal: 'ACS ES&T Engineering, 2024, 4 (8), 1927–1936', doi: '10.1021/acsestengg.4c00134' },
            { num: 239, authors: 'Z. Li, S. J. Chen, L. Liu, D. K. Qian, M. J. Yuan, J. Yu, Z. Q. Chen, J. K. Yang, X. T. Su, J. P. Hu, H. J. Hou', title: 'Formation mechanism of persistent free radicals during pyrolysis of Fenton-conditioned sewage sludge: Influence of NOM and iron', journal: 'Water Research, 2024, 254, 121376', doi: '10.1016/j.watres.2024.121376' },
            { num: 238, authors: 'L. Q. Cao, Y. B. Zuo, S. Liang, Y. F. Sun, Y. Ke, J. K. Yang, X. S. Wei, J. P. Hu, H. J. Hou', title: 'Geopolymerization of MSWI fly ash and coal fly ash for efficient solidification of heavy metals: Insights into stabilization mechanisms and long-term leaching behavior', journal: 'Construction and Building Materials, 2024, 411, 134359', doi: '10.1016/j.conbuildmat.2023.134359' },
            { num: 237, authors: 'L. Liu, J. P. Hu*, J. Tang, S. Chen, L. Wu, Z. Li, H. J. Hou, S. Liang, J. K. Yang', title: 'Peroxymonosulfate activation by trace iron(III) porphyrin for facile degradation of organic pollutants via nonradical oxidation', journal: 'Chemosphere, 2024, 349, 140847', doi: '10.1016/j.chemosphere.2023.140847' },
            { num: 236, authors: 'Z. Y. Li, Y. C. Hu, S. Liang, J. K. Yang, G. Hu, S. F. Zhou, J. P. Hu, R. V. Kumar', title: 'Bonding evolution in PbO@C composites for lead-carbon battery: Implications for HRPSoC performance', journal: 'Journal of Energy Storage, 2024, 100, 113667', doi: '10.1016/j.est.2024.113667' },
            { num: 235, authors: 'J. D. Quan, X. L. Li, S. Liang, G. Hu, X. W. Li, W. B. Yu, S. S. Yuan, H. B. Duan, J. P. Hu, H. J. Hou, X. Shi, J. K. Yang', title: 'Enhancing phosphorus removal by novel porous concrete fabricated with alkali-activated aggregate derived from industrial solid wastes', journal: 'Resources, Conservation and Recycling, 2024, 204, 107520', doi: '10.1016/j.resconrec.2024.107520' },
            { num: 234, authors: 'T. M. Jiang, X. Wu, S. S. Yuan, C. F. Lai, S. J. Bian, W. B. Yu, S. Liang, J. P. Hu, L. Huang, H. B. Duan, Y. F. Shi, J. K. Yang', title: 'A potential threat from biodegradable microplastics: mechanism of cadmium adsorption and desorption in the simulated gastrointestinal environment', journal: 'Frontiers of Environmental Science & Engineering, 2024, 18 (2), 19', doi: '10.1007/s11783-024-1779-4' },
            { num: 233, authors: '胡敬平，罗维，侯慧杰，杨家宽', title: '一种环境监测数据异常识别的方法、系统及设备（发明专利申请）', journal: '中国，申请号：CN202410513595.4', doi: '' },
            { num: 232, authors: '胡敬平，周晶晶，邓浩，徐倩，梅延润，徐璐瑶，侯慧杰，杨家宽，陈然', title: '一种从废旧锂离子电池中选择性浸出锂及再生磷酸铁锂正极材料的方法（发明专利申请）', journal: '中国，申请号：CN202410914563.5', doi: '' },
            { num: 231, authors: '胡敬平，刘龙敏，侯慧杰，杨家宽，徐璐瑶，周晶晶，梅延润，罗俊麟', title: '一种从废旧锂离子电池中分离回收有价金属元素以及再生正极材料的方法（发明专利申请）', journal: '中国，申请号：CN202411200391.1', doi: '' }
        ]
    };

    // ============ 渲染论文列表 ============
    const container = document.getElementById('publicationsContainer');
    if (container) {
        let html = '';
        const years = Object.keys(publicationsData).sort().reverse();
        years.forEach(function (year) {
            const papers = publicationsData[year];
            if (papers.length === 0) return;
            html += '<div class="pub-year-group">';
            html += '<div class="pub-year-heading" data-year="' + year + '">';
            html += '<span class="toggle-icon">▼</span> ' + year + ' 年（' + papers.length + ' 篇）';
            html += '</div>';
            html += '<div class="pub-year-body" id="pubYear-' + year + '">';
            papers.forEach(function (paper) {
                html += '<div class="pub-item">';
                html += '<span class="pub-num">[' + paper.num + ']</span> ';
                html += '<span class="pub-title">' + paper.title + '</span><br>';
                html += '<span>' + paper.authors + '</span><br>';
                html += '<span class="pub-journal">' + paper.journal + '</span>';
                if (paper.doi) {
                    html += '<span class="pub-doi">DOI: <a href="https://doi.org/' + paper.doi + '" target="_blank" rel="noopener">' + paper.doi + '</a></span>';
                }
                html += '</div>';
            });
            html += '</div>';
            html += '</div>';
        });
        container.innerHTML = html;

        // 折叠/展开年份
        document.querySelectorAll('.pub-year-heading').forEach(function (heading) {
            heading.addEventListener('click', function () {
                const year = heading.getAttribute('data-year');
                const body = document.getElementById('pubYear-' + year);
                if (body) {
                    const isCollapsed = body.classList.toggle('collapsed');
                    heading.classList.toggle('collapsed', isCollapsed);
                }
            });
        });
    }

    // ============ 渲染专利列表 ============
    const patentContainer = document.getElementById('patentList');
    if (patentContainer) {
        const patents = [
            { title: '一种从废旧锂离子电池中回收锂盐并制备磷酸锰铁锂正极材料的方法', inventors: '胡敬平，梅延润，邓浩，徐倩，徐璐瑶，刘龙敏，周晶晶，侯慧杰，杨家宽', info: '中国，专利号：ZL202410616152.8，授权公告日：2026-05-28' },
            { title: '一种基于仿生算法的固体废物优先消纳驱动的水泥配料方法', inventors: '宋晓玲，胡敬平，徐盼盼，汤建建，梁智霖，罗维，黄东，杨忠，侯慧杰，刘冰川', info: '中国，专利号：ZL202110639138.6，授权公告日：2026-03-27' },
            { title: '一种废旧锂离子电池正极材料浸出液除杂并直接制备再生正极材料的方法', inventors: '胡敬平，梁智霖，武龙胜，杨小容，汤建建，邓浩，徐倩，侯慧杰，杨家宽', info: '中国，专利号：ZL202210938734.9，授权公告日：2026-03-03' },
            { title: '一种以膨化石墨为原料制备单层或少层石墨烯的方法', inventors: '杨家宽，郑莹，胡敬平，黄亮，梁莎，周世发，胡广，李朝阳，杨帆，侯慧杰', info: '中国，专利号：ZL202411636572.9，授权公告日：2025-12-02' },
            { title: '一种挥发性有机化合物色谱峰保留时间的预测方法及系统', inventors: '胡敬平，罗维，侯慧杰，杨家宽', info: '中国，专利号：ZL202411860637.8，授权公告日：2025-09-26' },
            { title: '一种回收退役锂离子电池正极材料中有价金属的方法', inventors: '胡敬平，梁智霖，武龙胜，杨小容，刘露，丁晓宇，汤建建，侯慧杰，刘冰川，杨家宽', info: '中国，专利号：ZL202111495836.X' },
            { title: '一种负载金属卟啉/酞菁催化剂、其制备方法及应用', inventors: '胡敬平，陈思静，杨小容，武龙胜，丁晓宇，潘可亮，侯慧杰，刘冰川，杨家宽', info: '中国，专利号：ZL202011313113.9' },
            { title: '一种利用木质素磺酸盐制备自掺杂硫荧光碳纳米点的方法', inventors: '胡敬平，徐继坤，刘冰川，侯慧杰，杨家宽', info: '中国，专利号：ZL201910460277.5' },
            { title: '一种微波辅助粉煤灰基地聚物固化铅碱渣的方法', inventors: '侯慧杰，孙滢斐，李名扬，柯妍，李嘉豪，张攀，胡少刚，胡敬平，杨家宽，刘冰川，梁莎，肖可可，袁书珊', info: '中国，专利号：ZL201911281670.4' },
            { title: '一种利用水热法回收退役锂离子电池正极材料的方法', inventors: '胡敬平，蔡晨，彭刚伟，武龙胜，陈思静，侯慧杰，刘冰川，杨家宽，梁莎，肖可可', info: '中国，专利号：ZL201911049842.5' },
            { title: '基于机械化学法的废旧锂离子电池正极材料的回收方法', inventors: '胡敬平，彭刚伟，蔡晨，刘露，杨小容，侯慧杰，刘冰川，杨家宽，梁莎，肖可可', info: '中国，专利号：ZL201911052956.5' },
            { title: '一种掺硼金刚石修饰的衰减全反射晶片、其制备及应用', inventors: '胡敬平，陈思静，帕乌刘斯·波贝丁斯卡斯，约翰·福德，肯·哈嫩，武龙胜，侯慧杰，刘冰川，杨家宽', info: '中国，专利号：ZL201810906071.6' },
            { title: 'Composition for hydrogen generation（国际PCT专利）', inventors: 'J.S. Foord, J. Hu', info: 'PCT No. WO2014053799-A1；欧洲专利 EP2904054-A1' }
        ];
        let patentHtml = '';
        patents.forEach(function (p) {
            patentHtml += '<div class="patent-item">';
            patentHtml += '<strong>' + p.title + '</strong><br>';
            patentHtml += '<span>发明人：' + p.inventors + '</span><br>';
            patentHtml += '<span>' + p.info + '</span>';
            patentHtml += '</div>';
        });
        patentContainer.innerHTML = patentHtml;
    }
});