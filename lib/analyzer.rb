require "./lexical_analyzer.rb"

begin
	if ARGV[0]
		file = File.open(ARGV[0]).read

		lexical = LexicalAnalyzer.new

		lexical.code_to_lexemes file

	else
		raise "No file specified"
	end


end