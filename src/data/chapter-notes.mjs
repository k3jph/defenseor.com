// Original companion descriptions. Source scopes are recorded for editorial review.
export const chapterNotes = {
  "2e-01": {
    "overview": "Analytics is a crowded vocabulary before it is a collection of tools. Hill separates data analysis, statistics, data science, machine learning, and big data, asking what each contributes to an analytical problem. The chapter is an orientation for analysts and managers rather than a software tutorial: its purpose is to make the available approaches and their assumptions intelligible before a particular technique is chosen. Data collection, predictive modeling, classification, and dimension reduction appear within that broader account. Readers can use it to clarify what an analysis is meant to establish and where fashionable terminology conceals a more ordinary statistical question.",
    "basis": "1.1–1.4; terminology and closing cautions",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-02": {
    "overview": "An analyst does not always get to choose the software available to the people who will use the result. Lindquist and Sulewski work within that constraint, showing how Excel supports exploratory analysis, estimation, regression, constrained optimization, and simulation. Pivot tables, Solver, repeated calculations, and automation extend the spreadsheet beyond a place to store numbers, while the discussion keeps its practical limitations in view. The chapter is useful both as a working reference and as an account of how familiar software can support a range of analytical tasks. The choice of a convenient tool still leaves the analyst responsible for choosing an appropriate method.",
    "basis": "2.1; sections on exploratory analysis, estimation, regression, optimization, simulation, and automation",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-03": {
    "overview": "A model of a system describes how that system behaves; a decision model must also represent what the decision maker values. Burk develops multiattribute decision modeling around that distinction. The chapter moves from identifying objectives and alternatives to describing consequences, constructing value functions, and assessing the tradeoffs needed to compare competing outcomes. Cost, uncertainty, and sensitivity enter the analysis without making preferences disappear into the calculation. Readers considering alternatives with several objectives can use the chapter to see which judgments require evidence about the world and which require an explicit account of the decision maker’s priorities.",
    "basis": "3.1; value-focused thinking, value functions, weights, uncertainty, and sensitivity",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-04": {
    "overview": "Workforce planning connects decisions made now with the people and experience available years later. Bastian and Hall examine military personnel systems through the flows of accessions, promotion, retention, and separation, where a shortage at one point in a career structure cannot necessarily be repaired by recruiting directly into it. The chapter reviews analytical approaches that include optimization, stochastic modeling, and simulation, alongside workforce applications. Its central planning problem is temporal: a policy that meets an immediate staffing requirement can alter the future supply of experienced personnel. Readers encounter both the structure of that problem and several ways to model it.",
    "basis": "4.1; workforce model classes and examples",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-05": {
    "overview": "Counting activity and assessing progress are different tasks. Arnhart and King examine military assessment as a process of relating evidence to objectives, with attention to the people who define the questions, collect the data, and use the findings. The chapter discusses campaign, operational, and training assessment, combines qualitative and quantitative approaches, and addresses practical difficulties in establishing a useful assessment process. It does not offer a single measure that settles every assessment question. Instead, readers are asked to connect the intended purpose, available observations, and organizational setting before deciding what a reported result can support.",
    "basis": "5.1; assessment framework, data collection, analysis, and practice",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-06": {
    "overview": "Threatcasting begins with a possible future and asks how people might come to experience it. Vanatta and Johnson describe a structured foresight process that combines technical research with social, economic, cultural, and historical perspectives, using a person in a particular setting to make a future scenario concrete. The exercise is not a claim to predict an exact outcome. It provides a way to examine pathways, warning signs, and choices that could affect how a situation develops. Readers interested in long-horizon planning can use the chapter to distinguish the exploration of plausible futures from the estimation of a single forecast.",
    "basis": "6.1; threatcasting process and applications",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-07": {
    "overview": "A stochastic system need not always be approached through a discrete-event simulation. Burk introduces analytical models, including Markov chains and queueing models, as alternatives worth considering before committing to a more elaborate computational representation. The chapter compares the assumptions, effort, and kinds of results associated with these approaches. Analytical tractability comes with restrictions; simulation offers flexibility but produces sampled behavior that must be interpreted. Readers can use this comparison to ask which details a model needs to retain and which simplifications are defensible for the question being asked, rather than treating additional model detail as an automatic improvement.",
    "basis": "7.1; analytical models, Markov chains, queues, and comparison with simulation",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-08": {
    "overview": "A network diagram makes relationships visible, but describing and comparing those relationships requires more than drawing the links. Schubert Kabban, Mohd-Zaid, and Deckro introduce methods for characterizing social networks through mathematical network models, including structural properties, random graph models, and approaches to comparison and classification. The chapter also considers monitoring changes and assessing the adequacy of a representation. Its emphasis is on connecting a network’s observed features with a model that can be examined systematically. Readers moving from an informal picture of connections to a statistical or mathematical analysis will find several different questions that a network model can address.",
    "basis": "8.1; network characterization, monitoring, generating models, and assessment",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-09": {
    "overview": "Process improvement depends on understanding the process that actually produces the result. Bernacki, Hamm, and Wan organize that work into an eight-step approach, beginning with a clearly defined problem and proceeding through targets, root causes, countermeasures, implementation, confirmation, and standardization. A champion and a charter give the effort an organizational home, while evidence is needed to distinguish an apparent improvement from a durable change. The chapter connects these steps to the life cycle and interdependence of processes. Readers can use it to examine how a problem-solving effort moves from identifying a performance gap to maintaining and sharing a successful change.",
    "basis": "9.1–9.15; eight-step method",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-10": {
    "overview": "Simulation can describe what happens under a proposed set of conditions without identifying which conditions should be chosen. Hall, Wade, and Thengvall explain how simulation optimization joins those tasks: a simulation represents system behavior while an optimization procedure searches among alternatives. The chapter introduces the methodological relationship, surveys solution approaches and applications, and presents a worked military example. The useful distinction is between evaluating a candidate and searching for one. Readers considering an analysis in which a simulation supplies the performance measure can use the chapter to understand how that evaluation becomes part of a broader decision procedure.",
    "basis": "10.1–10.2; simulation optimization methodology",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-11": {
    "overview": "A test can produce a great deal of data without answering the question that justified conducting it. Ahner and Sigler develop analytical test planning around the connection between requirements, experimental conditions, execution, and analysis. Their account of scientific test and analysis techniques places the design of the evidence alongside the engineering of the system under examination. Interactions among factors and the choice of performance measures affect what a test can establish. Readers involved in acquisition or evaluation can use the chapter to ask whether a proposed test is capable of supporting the intended conclusion before resources are committed to collecting its data.",
    "basis": "11.1; scientific test and analysis process",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-12": {
    "overview": "Risk decisions often involve several uncertainties whose relationships matter as much as their individual probabilities. MacKenzie uses influence diagrams to make decisions, uncertain events, and consequences explicit within one representation. The chapter explains the meaning of the different nodes and arcs, works through examples, and discusses construction, probability assessment, common mistakes, and implementation in Netica. Drawing the diagram is part of structuring the problem, not a substitute for the judgments needed to populate it. Readers can use the chapter to examine what is known when a decision is made, how uncertain events are connected, and which outcomes the decision is meant to affect.",
    "basis": "12.1–12.6; construction, probability assessment, common mistakes, and software examples",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-13": {
    "overview": "Some time series contain abrupt changes or behavior at several scales that a heavily smoothed representation can obscure. Nystrom and colleagues introduce wavelet methods as a way to examine information in time and frequency together. The chapter develops wavelet theory and transforms, discusses thresholding and multiresolution analysis, and reviews forecasting approaches that use wavelets directly or as part of hybrid models. Applications include wind speed, earthquakes, and traffic, with a worked example and research questions. Readers can use it to consider what preprocessing preserves or removes before treating a cleaner-looking signal as a more useful basis for prediction.",
    "basis": "13.1–13.7; introduction, transforms, forecasting approaches, application review",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-14": {
    "overview": "A simulation that runs as programmed has passed a different test from a simulation that adequately represents a system for its intended use. Ledwith and colleagues distinguish verification from validation and survey how the latter has been approached. The chapter considers conceptual and operational validity, sources of uncertainty, graphical comparisons, statistical procedures, and several kinds of validation metrics. Expert judgment and the purpose of the model remain part of the problem rather than disappearing when a test statistic is computed. Readers can use this review to identify possible evidence for a validation argument and the limits of treating any single comparison as conclusive.",
    "basis": "14.1–14.9; verification/validation distinction and method survey",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-15": {
    "overview": "Cybersecurity measures are most useful when they express what an organization is trying to protect and why it matters. Scala and Goethals introduce operations research approaches to cyber defense and develop a value-focused framework for cybersecurity metrics and practices. An inventory drawn from information technology professionals illustrates the kinds of values that can enter the model, while the chapter emphasizes that an organization must supply its own assessments and priorities. The contribution is a way to structure defensive evaluation, not a universal scorecard. Readers can use it to connect security measures with objectives instead of allowing readily available measurements to define those objectives.",
    "basis": "15.1; value-focused model and inventory",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-16": {
    "overview": "Information requirements compete for attention and resources, so a useful question is how much an answer is expected to change what is known. Timms, Mandel, and Nelson compare the Indicators Validator structured analytic technique with an information-theoretic approach based on information gain. Through a hypothetical example, they examine limitations of the former and explain how a quantitative account of uncertainty reduction can support the assessment of information usefulness. The chapter’s contribution is a comparison of methods for prioritizing questions. Readers should keep the authors’ proposed measure and its assumptions visible rather than equating the amount of information collected with its value.",
    "basis": "16.1; Indicators Validator and information gain comparison",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-17": {
    "overview": "Scheduling becomes difficult when the resources available in one period depend on the transitions required in earlier periods. Markowski and Sarin examine the Army’s Sustainable Readiness Model as a problem that must first be framed carefully enough to support a mathematical formulation. Their treatment connects the readiness setting with methods from manufacturing and operations research, including lot streaming, decomposition, and column generation. The chapter follows that progression through an application rather than presenting the scheduling formulation in isolation. Readers can use it as an example of translating a complex organizational problem into a model while retaining the constraints that give the problem its meaning.",
    "basis": "17.1–17.6; framing, formulation, decomposition, and example",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-18": {
    "overview": "Weather information becomes operationally useful only when observations, analysis, and communication work together. Buchanan and colleagues examine that connection through installation use cases identified in the chapter as Fort Moore and Fort Carson. The discussion combines weather observations, numerical prediction, data fusion, automated alerts, and other analytical inputs within a broader information system. Detailed statistical derivations are intentionally outside its scope; the emphasis is on the systematic approach and the use of the resulting information. Readers can use these cases to examine how computing and data infrastructure connect to an actual service rather than treating a forecast as the end of the analytical process.",
    "basis": "18.1–18.5; two installation use cases and system-level approach",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-19": {
    "overview": "An improved calculation does not, by itself, give an organization a reason or a practical way to change its work. Price and DeGrange examine model adoption through implementation experience, including a scheduling tool whose expected benefits did not produce immediate acceptance. The chapter considers technical integration alongside organizational and individual concerns, using the system-task-person and state space frameworks to examine reactions to change. Its question is what must happen between building a useful model and having that model used. Readers can bring their own implementation problem to the discussion without assuming that reluctance to adopt a tool is simply a failure to understand its mathematics.",
    "basis": "19.1–19.9; implementation experience and adoption frameworks",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  },
  "2e-20": {
    "overview": "The design of an experiment is only one part of getting a test to work. Burke and Thorsen recount technical and interpersonal lessons from laboratory testing of a fast jet life support system, connecting scientific test and analysis techniques with the realities of planning, data management, communication, and teamwork. Their lessons include questioning standards, matching analysis to the data, and finding a champion within the test organization. The chapter is a case-based account rather than a primer on experimental design. Readers can use it to examine how an analytically sound plan depends on shared understanding and decisions made before the first observation is collected.",
    "basis": "20.1–20.4; case-study lessons and conclusions",
    "review": "Original companion overview based on the chapter introduction and relevant sections of the April 2024 production proof; not an author-supplied abstract."
  }
};
