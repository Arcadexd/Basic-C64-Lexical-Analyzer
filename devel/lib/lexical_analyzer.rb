



class LexicalAnalyzer
	
	def line_to_lexemes line
		line.split!("\s")
		
	end

	def code_to_lexemes file
		lines = file.split("\n")
		lexemes = []
		lines.each do |l|  
			lexemes << line_to_lexemes(l)
		end
		puts lexemes
		lexemes
	end

	
	
	
end
