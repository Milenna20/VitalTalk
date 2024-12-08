from transformers import GPT2Tokenizer, GPT2LMHeadModel, Trainer, TrainingArguments
from datasets import load_dataset, DatasetDict

dataset = load_dataset('json', data_files='trainee.json')

train_test = dataset['train'].train_test_split(test_size=0.2)
dataset = DatasetDict({
    'train': train_test['train'],
    'validation': train_test['test']
})

model_name = "gpt2"  
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

tokenizer.pad_token = tokenizer.eos_token  

model = GPT2LMHeadModel.from_pretrained(model_name)

def tokenize_function(examples):
    inputs = [text + tokenizer.eos_token + response for text, response in zip(examples['input'], examples['output'])]
    model_inputs = tokenizer(inputs, truncation=True, padding='max_length', max_length=128)
    model_inputs['labels'] = model_inputs['input_ids'].copy()  
    return model_inputs

tokenized_dataset = dataset.map(tokenize_function, batched=True)

training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    num_train_epochs=3,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset['train'],
    eval_dataset=tokenized_dataset['validation'],
)

trainer.train()

model.save_pretrained("./modelo_afinado")
tokenizer.save_pretrained("./modelo_afinado")
