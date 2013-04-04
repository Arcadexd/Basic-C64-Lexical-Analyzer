require "./keywords.rb"



class LexicalAnalyzer
	
	def line_to_lexemes line
		lexemes = []
		to_analyze = []
		token = ""
		line.split("").each { |c| 
			token << c
			if token.split("").last == " "
				to_analyze << token
				token = "" 
				next
			end
			if $WORDS.include?(token) || $OPS.include?(token) || $SYMBOLS.include?(token)
				lexemes << token 
				token = ""
				# print token
				next
			end
			# token.split("").each { |t| 
			# 	if $OPS.include?(t) || $SYMBOLS.include?(t)
			# 		lexemes << t
			# 		# print t
			# 	else
			# 		to_analyze << t
			# 	end
			# 	token = token[1, t.length]
			# }
		}
		print lexemes
		puts
		# print to_analyze
		# puts
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
