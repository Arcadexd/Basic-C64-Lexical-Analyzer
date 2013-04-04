require "./keywords.rb"



class LexicalAnalyzer
	
	def line_to_lexemes line
		lexemes = []
		lex = ""
		line.split("").each { |c| 
			lex << c
			# puts lex
			if $WORDS.include?(lex) || $OPS.include?(lex) || $SYMBOLS.include?(lex)
				lexemes << lex 
				lex = ""
				# print lex
				next
			end
			# lex.split("").each { |l| 
			# 	if $OP.include?
			# }
			if lex.split("").last == " "# || lex.split("").last == "\n"
				lex = "" 
				next
			end
		}
		print lexemes
		puts
	end

	def code_to_lexemes file
		lines = file.split("\n")
		lexemes = []
		lines.each_with_index do |l, i|  
			print i+1
			lexemes << line_to_lexemes(l)
		end
		# puts lexemes
		lexemes
	end

	
	
	
end
