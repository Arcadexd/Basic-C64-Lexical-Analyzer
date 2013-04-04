require "./keywords.rb"
require "./lexeme.rb"


class LexicalAnalyzer
	
	def line_to_lexemes line
		tokens =[]
		last_token=0
		end_token=0
		string=false
		line.each_char { |chr|
			if chr == "\""
				string = !string
				tokens << line[last_token..end_token]
				last_token=end_token
		  end
			if $OPS.include?(chr) or $SYMBOLS.include?(chr) or chr == " " and !string
				tokens << line[last_token..end_token]
				last_token=end_token
		  end
		  end_token+=1
		}
		 print tokens
	end

	def classify_tokens_to_lexemes tokens
		
	end

	def remove_quotes line
		quotes = []
		quote = ""
		add = false
		line.split("").each_index { |i| 
			if line[i] == "\"" and add == false
				add = true
			elsif line[i] == "\"" and add == true
				add = false
				quotes << quote[0, quote.length]+"\""
			end
			if add 
				quote << line[i]
			end
		}
		quotes.each { |q| 
			line.slice!(q)
		}
		quotes
	end

	def code_to_lexemes file
		lines = file.split("\n")
		lexemes = []
		lines.each_with_index do |l, i|  
			puts i+1
			lexemes << line_to_lexemes(l)
		end
		# puts lexemes
		lexemes
	end

end
